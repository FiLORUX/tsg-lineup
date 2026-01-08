# TSG Lineup

**Thåst Signal Generator – Broadcast Test Pattern Suite**

Browser-based toolkit for broadcast line-up, tone generation, test patterns, and multi-device sync.
Zero dependencies. Single HTML files. Works offline on any device.

---

## Philosophy

- **Self-contained** – Each HTML file works standalone, no build step
- **Offline-first** – Runs on Raspberry Pi, iPad, phone without internet
- **Broadcast-grade** – Frame-accurate sync, proper colour standards
- **Zero dependencies** – Pure HTML/CSS/JS, no npm, no frameworks

---

## Structure

```
tsg-lineup/
├── core/                  Main application
│   └── tsg-lineup.html    Primary test generator with sync
│
├── patterns/              Broadcast test patterns
│   ├── ChromaDuMonde.html Camera alignment chart
│   ├── tsg-ebu-bars.html  EBU colour bars (16:9)
│   ├── tsg-philips.html   Philips PM5644 testcard
│   ├── tsg-testbild-001.html  EBU testbild
│   └── assets/
│
├── generators/            Test signal generators
│   ├── Lineup-001.html    TGLF framework v1
│   ├── Lineup-002.html    TGLF framework v2
│   └── tsg-test-gen-v2.html  Broadcast test generator
│
├── tools/                 Utilities
│   ├── test-qr.html       QR code sync testing
│   └── favicon.*          Icon assets
│
├── docs/                  Documentation
│   ├── ADVANCED-FEATURES.md  Web Components, WebRTC, WASM
│   ├── SYNC-GUIDE.md      Multi-device synchronisation
│   └── TESTING-SYNC.md    Sync verification procedures
│
└── legacy/                Historical versions
    └── tsg-lineup-v1.html
```

---

## Quick Start

Open any HTML file directly in a browser:

```bash
open core/tsg-lineup.html
```

Or serve locally:

```bash
python3 -m http.server 8080
# → http://localhost:8080/core/tsg-lineup.html
```

---

## Features

### Test Patterns
- **EBU Colour Bars** – ITU-R BT.801 compliant
- **PLUGE** – Black level reference
- **ChromaDuMonde** – Camera colour alignment
- **Philips PM5644** – Classic geometry/colour testcard

### Generators
- **TGLF** – Thåst Global Lineup Framework
- **Countdown cues** – 10s leader with tone
- **Program slates** – Clock and sync tone

### Sync (WebRTC)
- **Multi-device sync** – Frame-accurate across devices
- **QR handshake** – Scan to connect, no server needed
- **Master/slave mode** – One source, multiple displays

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Q` | Toggle QR code (sync mode) |
| `F` | Fullscreen |
| `Space` | Start/stop |

---

## URL Parameters

```
tsg-lineup.html?room=studio-a&role=master&state=sync
```

| Param | Values | Description |
|-------|--------|-------------|
| `room` | string | Sync room identifier |
| `role` | `master`, `slave` | Device role |
| `state` | `sync`, `bars`, `pluge` | Initial state |

---

## Standards

- ITU-R BT.801 (EBU colour bars)
- ITU-R BT.814 (PLUGE)
- SMPTE RP 219 (HD test patterns)
- ISO/IEC 18004 (QR codes)

---

## Licence

MIT – David Thåst
Part of [TSG Suite](https://github.com/FiLORUX)
