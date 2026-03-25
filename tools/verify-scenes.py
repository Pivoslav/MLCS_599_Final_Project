#!/usr/bin/env python3
"""
Static smoke check for js/game-scenes.js (same intent as verify-scenes.js).
Run from Final/:  python tools/verify-scenes.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCENES = ROOT / "js" / "game-scenes.js"
CONFIG = ROOT / "js" / "game-config.js"

# Reached via winter roll (pickCrisisEvent), not a static choice.next string.
EVENT_JUMP_TARGETS = {
    "event_censor",
    "event_flood_echo",
    "event_salon",
    "event_rural_gentry",
    "event_zemstvo_clash",
}


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    text = SCENES.read_text(encoding="utf-8")
    scene_keys = set(re.findall(r"^\s{6}([a-z0-9_]+):\s*\{", text, re.MULTILINE))

    # Choice lines are single-line objects with "text:" (avoids primaryRead bodies).
    for i, line in enumerate(text.splitlines(), 1):
        stripped = line.strip()
        if not stripped.startswith("{ text:"):
            continue
        if "roll: true" in line or ", roll: true" in line:
            if "next: null" not in line:
                errors.append(f"line {i}: roll choice must have next: null")
            continue
        m = re.search(r'next:\s*"([a-z0-9_]+)"', line)
        if not m:
            errors.append(f"line {i}: choice missing next (expected next: \"…\")")
            continue
        target = m.group(1)
        if target != "ending_computed" and target not in scene_keys:
            errors.append(f"line {i}: unknown next \"{target}\"")

    cfg = CONFIG.read_text(encoding="utf-8")
    start = cfg.find("const RESOLVE_PATH_LEAD")
    if start < 0:
        errors.append("RESOLVE_PATH_LEAD not found in game-config.js")
    else:
        block = cfg[start : start + 8000]
        for k in ("west", "slav", "statist", "med"):
            if not re.search(rf"\n\s*{k}\s*:", block):
                errors.append(f"RESOLVE_PATH_LEAD missing key {k!r}")

    sch = re.search(
        r"const SCENE_COLOR_SCHEME = \{(.*?)\n    \};", cfg, re.DOTALL
    )
    if sch:
        for sk in re.findall(r"\n\s*([a-z0-9_]+)\s*:", sch.group(1)):
            if sk not in scene_keys:
                errors.append(f'SCENE_COLOR_SCHEME references unknown scene "{sk}"')

    if "intro" not in scene_keys:
        errors.append('Missing scene "intro"')
    if "ending_computed" not in scene_keys:
        errors.append('Missing scene "ending_computed"')

    referenced = {"intro", "session_format"}
    for m in re.finditer(r'next:\s*"([a-z0-9_]+)"', text):
        t = m.group(1)
        if t != "ending_computed":
            referenced.add(t)

    for sid in sorted(scene_keys):
        if (
            sid != "ending_computed"
            and sid not in referenced
            and sid not in EVENT_JUMP_TARGETS
        ):
            warnings.append(
                f'Scene "{sid}" is never targeted by any choice.next (orphan / dev only?)'
            )

    if warnings:
        print("Warnings:\n" + "\n".join(f"  - {w}" for w in warnings), file=sys.stderr)
    if errors:
        print("Errors:\n" + "\n".join(f"  - {e}" for e in errors), file=sys.stderr)
        return 1

    print(
        "verify-scenes: OK - "
        f"{len(scene_keys)} scenes, {len(referenced)} referenced from choices, "
        "RESOLVE_PATH_LEAD keys present."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
