# Vendored fonts

## Why these files are here

The generator must render the same letterforms on every machine, and it must do
so on an air-gapped studio network. Those two requirements together rule out
both a web font fetched from a CDN and a face that merely *happens* to be
installed locally.

Before this directory existed, `core/tsg-lineup.html` asked for
`'Share Tech Mono', monospace` without providing the face. On a machine with the
font installed the canvas drew Share Tech Mono; anywhere else it silently fell
back to whatever the operating system calls `monospace`. The same build
therefore produced different glyphs on different machines — acceptable for a
preview, not for a reference generator, and impossible to hold the SDI overlay
against.

Both outputs now come from the file in this directory: the browser through
`@font-face`, and the Rust renderer through `include_bytes!`. One face, two
encodes — the same relationship the signal spec defines for the picture.

## What these files are

| File | Use |
|------|-----|
| `ShareTechMono-Regular.ttf` | Embedded in the Tauri binary and rasterised for the SDI overlay |
| `ShareTechMono-Regular.woff2` | Served to the browser through `@font-face` |

Share Tech Mono, Regular, **version 1.003**. Both files are the same face; the
TTF is the WOFF2 decompressed, so the outlines are identical by construction
rather than by assumption.

**This is a subset**, carrying 102 codepoints: printable ASCII `U+0020`–`U+007E`,
the Swedish vowels `ÄÅÖäåö`, and `∞` (`U+221E`). That is the full set the
overlays draw. Anything outside it will render as `.notdef` — extend the subset
rather than adding a fallback face, because a fallback reintroduces exactly the
per-machine variation this directory exists to remove.

Metrics: 1000 units/em, ascent 885, descent −242, advance width 540.

## Provenance

Extracted from the base64 payload embedded in
`tsg-thast-timing/legacy/v1-standalone/Thåst Timing Hybrid Broadcast Clock.html`,
which was produced by that project's `scripts/embed-fonts.mjs`.

Note that the payloads in that file are **mislabelled**: the block declaring
`font-family:"Orbitron"` weight 400 contains Share Tech Mono, and the block
declaring `font-family:"Share Tech Mono"` contains Orbitron. The Orbitron Bold
block is correct. The face here was taken by reading each payload's internal
`name` table rather than trusting the declaration, and verified as
`Share Tech Mono / Regular / Version 1.003`. That swap is a live defect in the
standalone clock, which renders the two faces the wrong way round.

## Licence

Share Tech Mono is licensed under the **SIL Open Font License 1.1**, which
permits redistribution and embedding, including inside a binary.

`OFL.txt` is **not yet present in this directory and must be added verbatim**
from the upstream release before this font ships in a public artefact. The
licence text is not reproduced here from memory: a licence paraphrased is a
licence broken, and the OFL requires the notice to travel with the font.
