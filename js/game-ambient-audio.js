/**
 * Procedural ambient beds (Web Audio API only, no MP3). Keyed by SCENE_AMBIENT buckets
 * (salon, print, neva, …). Evocative, not documentary; see open-toolkit-showcase §4 pedagogy note.
 */
(function () {
    const STORAGE_KEY = "mlcs599_ambient_enabled";

    function reducedMotion() {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function readPref() {
      try {
        return sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch (e) {
        return false;
      }
    }

    function writePref(on) {
      try {
        if (on) sessionStorage.setItem(STORAGE_KEY, "1");
        else sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }

    /** @type {AudioContext|null} */
    let audioCtx = null;
    /** @type {GainNode|null} */
    let masterGain = null;
    let currentKey = "";
    /** @type {Array<{ t:number }>} */
    let disposers = [];

    function getCtx() {
      if (audioCtx) return audioCtx;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioCtx.destination);
      return audioCtx;
    }

    function resumeIfNeeded() {
      const c = getCtx();
      if (!c) return;
      if (c.state === "suspended") c.resume();
    }

    /**
     * Triad or stack: triangle/sine oscillators + optional slow tremolo on master branch.
     * @param {{ freqs: number[], types?: string[], relGain?: number[], detune?: number[], master?: number, lfoHz?: number, lfoDepth?: number }} spec
     */
    function buildOscPatch(c, spec) {
      const now = c.currentTime;
      const freqs = spec.freqs || [196];
      const types = spec.types || freqs.map(() => "triangle");
      const rel = spec.relGain || freqs.map(() => 1 / freqs.length);
      const det = spec.detune || freqs.map(() => 0);
      const lfoHz = spec.lfoHz != null ? spec.lfoHz : 0.07;
      const lfoDepth = spec.lfoDepth != null ? spec.lfoDepth : 0.22;
      const sub = c.createGain();
      sub.gain.value = spec.master != null ? spec.master : 0.085;
      sub.connect(masterGain);

      const oscs = [];
      const voiceGains = [];
      for (let i = 0; i < freqs.length; i += 1) {
        const o = c.createOscillator();
        o.type = types[i] || "triangle";
        o.frequency.value = freqs[i];
        o.detune.value = det[i] || 0;
        const g = c.createGain();
        const base = rel[i] * 0.45;
        g.gain.value = base;
        o.connect(g);
        g.connect(sub);
        o.start(now);
        oscs.push(o);
        voiceGains.push(g);
      }

      let lfo = null;
      let lfoGain = null;
      if (lfoHz > 0 && lfoDepth > 0) {
        lfo = c.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = lfoHz;
        lfoGain = c.createGain();
        lfoGain.gain.value = lfoDepth * 0.04;
        lfo.connect(lfoGain);
        lfoGain.connect(sub.gain.gain);
        lfo.start(now);
      }

      return {
        stop(at, fadeSec) {
          const t0 = Math.max(at, c.currentTime);
          const fd = Math.max(0.05, fadeSec);
          try {
            sub.gain.cancelScheduledValues(t0);
            const gv = Math.max(0.0001, sub.gain.value);
            sub.gain.setValueAtTime(gv, t0);
            sub.gain.exponentialRampToValueAtTime(0.0008, t0 + fd);
          } catch (e) {
            sub.gain.linearRampToValueAtTime(0, t0 + fd);
          }
          const stopT = t0 + fd + 0.05;
          oscs.forEach((o) => {
            try {
              o.stop(stopT);
            } catch (e) {}
          });
          if (lfo) {
            try {
              lfo.stop(stopT);
            } catch (e) {}
          }
        }
      };
    }

    /** Filtered noise layer (short buffer, looped) for water/wind texture */
    function buildNoiseLayer(c, spec) {
      const now = c.currentTime;
      const dur = spec.noiseDur || 1.2;
      const n = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, n, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i += 1) d[i] = (Math.random() * 2 - 1) * 0.5;
      const src = c.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const f = c.createBiquadFilter();
      f.type = spec.fType || "lowpass";
      f.frequency.value = spec.fFreq || 400;
      f.Q.value = spec.fQ != null ? spec.fQ : 0.7;
      const g = c.createGain();
      g.gain.value = spec.nGain != null ? spec.nGain : 0.035;
      src.connect(f);
      f.connect(g);
      g.connect(masterGain);
      src.start(now);

      const lfo = c.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = spec.lfoF || 0.12;
      const lfoG = c.createGain();
      lfoG.gain.value = spec.lfoAmt != null ? spec.lfoAmt : 120;
      lfo.connect(lfoG);
      lfoG.connect(f.frequency);
      lfo.start(now);

      return {
        stop(at, fadeSec) {
          const t0 = Math.max(at, c.currentTime);
          const fd = Math.max(0.05, fadeSec);
          try {
            g.gain.cancelScheduledValues(t0);
            g.gain.setValueAtTime(g.gain.value, t0);
            g.gain.exponentialRampToValueAtTime(0.0008, t0 + fd);
          } catch (e) {}
          const stopT = t0 + fd + 0.08;
          try {
            src.stop(stopT);
          } catch (e) {}
          try {
            lfo.stop(stopT);
          } catch (e) {}
        }
      };
    }

    const PATCHES = {
      salon: () => buildOscPatch(getCtx(), {
        freqs: [196, 246.94, 293.66],
        types: ["triangle", "triangle", "triangle"],
        relGain: [0.4, 0.35, 0.25],
        detune: [0, 6, -4],
        master: 0.09,
        lfoHz: 0.055,
        lfoDepth: 0.35
      }),
      print: () => buildOscPatch(getCtx(), {
        freqs: [415.3, 523.25, 659.25],
        types: ["sine", "sine", "triangle"],
        relGain: [0.35, 0.4, 0.25],
        detune: [0, 3, -2],
        master: 0.072,
        lfoHz: 0.11,
        lfoDepth: 0.2
      }),
      neva: () => {
        const c = getCtx();
        const a = buildOscPatch(c, {
          freqs: [88, 165],
          types: ["sine", "sine"],
          relGain: [0.55, 0.45],
          master: 0.07,
          lfoHz: 0.045,
          lfoDepth: 0.5
        });
        const b = buildNoiseLayer(c, {
          fType: "lowpass",
          fFreq: 320,
          nGain: 0.028,
          lfoF: 0.09,
          lfoAmt: 180,
          noiseDur: 1.4
        });
        return {
          stop(at, fs) {
            a.stop(at, fs);
            b.stop(at, fs);
          }
        };
      },
      soil: () => buildOscPatch(getCtx(), {
        freqs: [174.61, 220, 261.63],
        types: ["triangle", "triangle", "sine"],
        relGain: [0.4, 0.35, 0.25],
        detune: [-5, 0, 4],
        master: 0.088,
        lfoHz: 0.04,
        lfoDepth: 0.28
      }),
      crown: () => buildOscPatch(getCtx(), {
        freqs: [130.81, 196],
        types: ["sine", "triangle"],
        relGain: [0.55, 0.45],
        master: 0.095,
        lfoHz: 0.035,
        lfoDepth: 0.18
      }),
      bridge: () => buildOscPatch(getCtx(), {
        freqs: [220, 277.18, 329.63],
        types: ["triangle", "sine", "triangle"],
        relGain: [0.34, 0.33, 0.33],
        detune: [2, -3, 1],
        master: 0.082,
        lfoHz: 0.065,
        lfoDepth: 0.3
      }),
      winter: () => buildOscPatch(getCtx(), {
        freqs: [65.41, 783.99],
        types: ["sine", "sine"],
        relGain: [0.72, 0.28],
        detune: [0, 8],
        master: 0.065,
        lfoHz: 0.025,
        lfoDepth: 0.55
      }),
      flood: () => {
        const c = getCtx();
        const a = buildOscPatch(c, {
          freqs: [98, 123.47],
          types: ["triangle", "sine"],
          relGain: [0.5, 0.5],
          master: 0.08,
          lfoHz: 0.038,
          lfoDepth: 0.42
        });
        const b = buildNoiseLayer(c, {
          fType: "lowpass",
          fFreq: 260,
          fQ: 0.5,
          nGain: 0.032,
          lfoF: 0.06,
          lfoAmt: 90,
          noiseDur: 2
        });
        return {
          stop(at, fs) {
            a.stop(at, fs);
            b.stop(at, fs);
          }
        };
      },
      censor: () => buildOscPatch(getCtx(), {
        freqs: [311.13, 415.3],
        types: ["sine", "sine"],
        relGain: [0.6, 0.4],
        detune: [0, 1.5],
        master: 0.06,
        lfoHz: 0.14,
        lfoDepth: 0.15
      }),
      zemstvo: () => buildOscPatch(getCtx(), {
        freqs: [246.94, 311.13, 369.99],
        types: ["triangle", "triangle", "sine"],
        relGain: [0.35, 0.35, 0.3],
        master: 0.084,
        lfoHz: 0.05,
        lfoDepth: 0.25
      }),
      sorting: () => buildOscPatch(getCtx(), {
        freqs: [185, 233.08, 293.66],
        types: ["triangle", "triangle", "triangle"],
        relGain: [0.33, 0.34, 0.33],
        detune: [0, 7, -7],
        master: 0.075,
        lfoHz: 0.09,
        lfoDepth: 0.4
      }),
      finis: () => buildOscPatch(getCtx(), {
        freqs: [174.61, 220, 261.63],
        types: ["sine", "sine", "triangle"],
        relGain: [0.38, 0.34, 0.28],
        master: 0.055,
        lfoHz: 0.032,
        lfoDepth: 0.22
      })
    };

    function stopAllDisposers(at, fadeSec) {
      disposers.forEach((d) => {
        if (d && typeof d.stop === "function") d.stop(at, fadeSec);
      });
      disposers = [];
    }

    function applyAmbient(ambientKey) {
      if (!readPref() || reducedMotion()) return;
      const c = getCtx();
      if (!c || !masterGain) return;
      const key = PATCHES[ambientKey] ? ambientKey : "salon";
      if (key === currentKey && disposers.length) return;

      const now = c.currentTime;
      const fadeOut = 0.38;
      stopAllDisposers(now, fadeOut);
      currentKey = key;

      try {
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(Math.max(0.0001, masterGain.gain.value), now);
        masterGain.gain.linearRampToValueAtTime(1, now + 0.02);
      } catch (e) {
        masterGain.gain.value = 1;
      }

      const factory = PATCHES[key];
      const patch = factory();
      disposers.push(patch);
    }

    function hardMute() {
      const c = audioCtx;
      if (!c || !masterGain) {
        stopAllDisposers(0, 0.01);
        currentKey = "";
        return;
      }
      const now = c.currentTime;
      stopAllDisposers(now, 0.15);
      currentKey = "";
      try {
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(0, now + 0.16);
      } catch (e) {
        masterGain.gain.value = 0;
      }
    }

    function setEnabled(on) {
      writePref(on);
      if (reducedMotion()) {
        hardMute();
        syncToggleUI(false);
        return;
      }
      if (on) {
        resumeIfNeeded();
        const amb = document.querySelector(".content") && document.querySelector(".content").getAttribute("data-ambient");
        currentKey = "";
        applyAmbient(amb || "salon");
      } else {
        hardMute();
      }
      syncToggleUI(on);
    }

    function syncToggleUI(on) {
      const btn = document.getElementById("ambientToggle");
      if (!btn) return;
      const effective = on && !reducedMotion();
      btn.setAttribute("aria-pressed", effective ? "true" : "false");
      btn.textContent = reducedMotion() ? "Ambient (off)" : effective ? "Ambient on" : "Ambient off";
      btn.disabled = !!reducedMotion();
      btn.title = reducedMotion()
        ? "Ambient sound disabled when reduced motion is on"
        : "Toggle procedural ambient (Web Audio; not a historical recording)";
    }

    function wire() {
      const btn = document.getElementById("ambientToggle");
      if (btn) {
        syncToggleUI(readPref());
        btn.addEventListener("click", () => {
          if (reducedMotion()) return;
          resumeIfNeeded();
          setEnabled(!readPref());
        });
      }

      const once = () => {
        if (readPref() && !reducedMotion()) resumeIfNeeded();
        document.body.removeEventListener("click", once);
        document.body.removeEventListener("keydown", once);
      };
      document.body.addEventListener("click", once);
      document.body.addEventListener("keydown", once);

      window.addEventListener("pageshow", () => {
        if (!readPref() || reducedMotion()) return;
        resumeIfNeeded();
        const amb = document.querySelector(".content") && document.querySelector(".content").getAttribute("data-ambient");
        currentKey = "";
        applyAmbient(amb || "salon");
      });

      if (window.matchMedia) {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onReduce = () => {
          if (reducedMotion()) hardMute();
          syncToggleUI(readPref());
        };
        if (mq.addEventListener) mq.addEventListener("change", onReduce);
        else if (mq.addListener) mq.addListener(onReduce);
      }
    }

    window.MLCS599Ambient = {
      /** Call when `data-ambient` / scene bucket changes */
      crossfadeTo(ambientKey) {
        if (!readPref() || reducedMotion()) return;
        resumeIfNeeded();
        applyAmbient(ambientKey);
      },
      wire,
      setEnabled,
      reducedMotion
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", wire);
    } else {
      wire();
    }
  })();
