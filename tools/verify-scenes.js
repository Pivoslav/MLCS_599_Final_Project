#!/usr/bin/env node
/**
 * Static smoke check for js/game-scenes.js: every choice.next points at a real scene
 * (or ending_computed), crisis rows use roll + null next, RESOLVE_PATH_LEAD keys match paths.
 *
 * Run from repo root (Final/):  node tools/verify-scenes.js
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const scenesPath = path.join(root, "js", "game-scenes.js");
const configPath = path.join(root, "js", "game-config.js");

function loadScenes() {
  const code = fs.readFileSync(scenesPath, "utf8");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(code.replace(/^\s*const scenes =/, "var scenes ="), ctx);
  if (!ctx.scenes || typeof ctx.scenes !== "object") {
    throw new Error("Failed to load scenes object from game-scenes.js");
  }
  return ctx.scenes;
}

function loadResolveLeadKeys() {
  const config = fs.readFileSync(configPath, "utf8");
  const start = config.indexOf("const RESOLVE_PATH_LEAD");
  if (start < 0) throw new Error("RESOLVE_PATH_LEAD not found in game-config.js");
  const rest = config.slice(start);
  const endMarker = rest.indexOf("\n    };");
  const block = endMarker >= 0 ? rest.slice(0, endMarker) : rest;
  const required = ["west", "slav", "statist", "med"];
  const missing = required.filter((k) => !new RegExp(`\\n\\s*${k}\\s*:`).test(block));
  if (missing.length) {
    throw new Error(`RESOLVE_PATH_LEAD missing keys: ${missing.join(", ")}`);
  }
  return required;
}

function loadSchemeSceneKeys() {
  const config = fs.readFileSync(configPath, "utf8");
  const start = config.indexOf("const SCENE_COLOR_SCHEME");
  if (start < 0) return [];
  const rest = config.slice(start);
  const m = rest.match(/const SCENE_COLOR_SCHEME = \{([\s\S]*?)\n    \};/);
  if (!m) return [];
  const body = m[1];
  const keys = [];
  const re = /\n\s*([a-z0-9_]+)\s*:/g;
  let x;
  while ((x = re.exec(body))) keys.push(x[1]);
  return keys;
}

function main() {
  const errors = [];
  const warnings = [];

  const scenes = loadScenes();
  const sceneKeys = new Set(Object.keys(scenes));

  try {
    loadResolveLeadKeys();
  } catch (e) {
    errors.push(e.message);
  }

  for (const sk of loadSchemeSceneKeys()) {
    if (!sceneKeys.has(sk)) {
      errors.push(`SCENE_COLOR_SCHEME references unknown scene "${sk}"`);
    }
  }

  for (const [id, scene] of Object.entries(scenes)) {
    if (!scene || typeof scene !== "object") continue;
    const choices = scene.choices;
    if (!Array.isArray(choices)) {
      if (!scene.computed) warnings.push(`Scene "${id}" has no choices array`);
      continue;
    }
    choices.forEach((ch, i) => {
      if (!ch || typeof ch !== "object") return;
      const hasRoll = ch.roll === true;
      const n = ch.next;
      if (hasRoll) {
        if (n != null) errors.push(`Scene "${id}" choice[${i}]: roll choice must use next: null`);
        if (!String(id).startsWith("crisis_")) {
          warnings.push(`Scene "${id}" choice[${i}]: roll:true outside crisis_* (unexpected)`);
        }
        return;
      }
      if (n == null || n === "") {
        errors.push(`Scene "${id}" choice[${i}]: missing next (not a roll choice)`);
        return;
      }
      if (typeof n !== "string") {
        errors.push(`Scene "${id}" choice[${i}]: next must be a string`);
        return;
      }
      if (n === "ending_computed") return;
      if (!sceneKeys.has(n)) {
        errors.push(`Scene "${id}" choice[${i}]: unknown next "${n}"`);
      }
    });
  }

  if (!sceneKeys.has("intro")) errors.push('Missing scene "intro"');
  if (!sceneKeys.has("ending_computed")) errors.push('Missing scene "ending_computed"');

  const referenced = new Set();
  referenced.add("intro");
  for (const scene of Object.values(scenes)) {
    if (!scene || !Array.isArray(scene.choices)) continue;
    for (const ch of scene.choices) {
      if (ch && typeof ch.next === "string" && ch.next !== "ending_computed") referenced.add(ch.next);
    }
  }
  const eventJump = new Set([
    "event_censor",
    "event_flood_echo",
    "event_salon",
    "event_rural_gentry",
    "event_zemstvo_clash"
  ]);
  for (const id of sceneKeys) {
    if (!referenced.has(id) && id !== "ending_computed" && !eventJump.has(id)) {
      warnings.push(`Scene "${id}" is never targeted by any choice.next (orphan / dev only?)`);
    }
  }

  if (warnings.length) {
    console.warn("Warnings:\n", warnings.map((w) => `  - ${w}`).join("\n"));
  }
  if (errors.length) {
    console.error("Errors:\n", errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }

  console.log(
    `verify-scenes: OK; ${sceneKeys.size} scenes, ${referenced.size} referenced from choices, RESOLVE_PATH_LEAD keys present.`
  );
}

main();
