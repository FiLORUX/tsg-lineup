# TSG Lineup

**Thåst Signal Generator — broadcast test-pattern suite**

A browser-based, zero-dependency generator for broadcast line-up: colour bars,
PLUGE, reference test patterns and frame-accurate multi-device sync. No build
step, no frameworks — a single set of static HTML that runs offline on anything
from a studio PC to a Raspberry Pi or a phone.

- **Live:** <https://thåst.se/tsg/lineup>
- **Signal specification:** [`SPEC.md`](SPEC.md) — the normative signal-domain,
  colorimetry and conformance spec.
- **Desktop app (SDI output):** cross-platform installers are published under
  [Releases](../../releases). The desktop build adds true 10-bit SDI output over
  Blackmagic DeckLink hardware.

---

## Philosophy

- **Self-contained** — each page runs standalone, no build step.
- **Offline-first** — no server, no internet; a QR handshake links devices
  directly.
- **Broadcast-grade** — exact colour standards and a single signal source of
  truth shared by the browser preview and the SDI wire (see [`SPEC.md`](SPEC.md)).
- **Zero dependencies** — pure HTML/CSS/JS.

---

## Structure

```
tsg-lineup/
├── index.html            Entry — redirects to the current app
├── core/
│   ├── tsg-lineup.html    The application (test generator + sync)
│   └── signal-render.js   Signal renderer, bit-exact with the SDI master
├── patterns/             Reference test patterns
│   ├── ebu-lineup.json    The shared signal master (SPEC.md §7)
│   ├── ChromaDuMonde.html Camera colour-alignment chart
│   ├── tsg-ebu-bars.html  EBU colour bars (16:9)
│   ├── tsg-philips.html   Philips PM5644 testcard
│   └── tsg-testbild-001.html
└── SPEC.md               Normative signal-domain specification
```

---

## Quick start

Open the app directly:

```bash
open core/tsg-lineup.html
```

or serve locally:

```bash
python3 -m http.server 8080
# → http://localhost:8080/
```

---

## Features

- **Reference patterns** — EBU 100/0/75/0 colour bars, PLUGE, ChromaDuMonde,
  Philips PM5644.
- **Line-up aids** — countdown leader with tone, programme slates, clock.
- **Multi-device sync (WebRTC)** — frame-accurate master/display sync with a
  scan-to-connect QR handshake; no server required.

### Keyboard shortcuts

| Key     | Action                    |
|---------|---------------------------|
| `Q`     | Toggle QR code (sync mode)|
| `F`     | Fullscreen                |
| `Space` | Start / stop              |

### URL parameters

```
core/tsg-lineup.html?room=studio-a&role=master&state=sync
```

| Param   | Values                  | Description          |
|---------|-------------------------|----------------------|
| `room`  | string                  | Sync room identifier |
| `role`  | `master`, `slave`       | Device role          |
| `state` | `sync`, `bars`, `pluge` | Initial state        |

---

## Standards

Signal definitions and exact code values are given in [`SPEC.md`](SPEC.md). The
patterns follow:

- **ITU-R BT.709** — HDTV colorimetry and the luma/colour-difference matrix.
- **EBU Tech 3299** — HD (100/0/75/0) colour bars.
- **ITU-R BT.814** — PLUGE.
- **SMPTE RP 219** — HD reference test patterns.
- **SMPTE ST 274** — 1920 × 1080 sample structure and timing references.
- **ISO/IEC 18004** — QR codes (sync handshake).

---

## Licence

Licensed under the [Apache License 2.0](LICENSE). © 2026 David Thåst.
Part of the [TSG](https://thåst.se/tsg) suite.
