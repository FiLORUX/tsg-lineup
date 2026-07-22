# TSG Lineup

Broadcast line-up in a browser tab. EBU colour bars, PLUGE, reference test cards
and frame-accurate multi-device sync — static HTML, no server, no build, offline
from the gallery to a Raspberry Pi.

What the browser previews and what the desktop build puts on the SDI wire are two
encodes of one format-independent master. The signal domain, the exact code
values and the conformance rules are in **[SPEC.md](SPEC.md)**.

| | |
|---|---|
| Live | <https://thåst.se/tsg/lineup> |
| Installers — SDI over DeckLink | [Releases](../../releases) |
| Signal specification | [SPEC.md](SPEC.md) |

## Layout

```
index.html            → core/tsg-lineup.html
core/
  tsg-lineup.html     the application: generator, patterns, sync
  signal-render.js    renderer, bit-exact with the SDI master
patterns/
  ebu-lineup.json     the shared signal master (SPEC.md §7)
  ChromaDuMonde.html · tsg-ebu-bars.html · tsg-philips.html · tsg-testbild-001.html
SPEC.md               normative signal specification
```

## Run

```
open core/tsg-lineup.html          # or:  python3 -m http.server 8080
```

## In the app

EBU 100/0/75/0 bars · PLUGE · ChromaDuMonde · Philips PM5644 · countdown leader
with tone · slates · clock. Sync is master/display over WebRTC, paired by a
scan-to-connect QR handshake — no server in the path.

`Q` QR · `F` fullscreen · `Space` run/stop · `?room=studio-a&role=master&state=sync`

## Standards

BT.709 colorimetry · EBU Tech 3299 bars · BT.814 PLUGE · SMPTE RP 219 patterns ·
SMPTE ST 274 raster · ISO/IEC 18004 QR. Exact code values in [SPEC.md](SPEC.md).

## Licence

Apache-2.0 · © 2026 David Thåst · part of [TSG](https://thåst.se/tsg).
