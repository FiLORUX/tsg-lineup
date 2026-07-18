/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SIGNAL-DOMAIN PATTERN RENDERER (browser / 8-bit preview)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * The browser half of the signal-spec architecture. It consumes the SAME
 * format-independent pattern spec the Rust renderer does (see
 * `docs/SIGNAL-SPEC.md`) and evaluates it to the 8-bit canvas — so the preview
 * and the 10-bit SDI wire are two faithful encodes of one source of truth, never
 * two hand-authored patterns that can drift.
 *
 * The evaluation and the 8-bit encode are bit-for-bit identical to the Rust
 * renderer's `sample()` + `enc8()` (verified in parity tests): a spec value of
 * 0.75 lands on canvas code 180, PLUGE −2% (−0.02) on 12, super-white (1.087) on
 * 254 — exactly the codes the app authored by hand before this existed.
 *
 * This renders the STATIC reference layer only. Animated overlays (timecode,
 * sync boxes) are composited on top by the app and are not part of the spec.
 *
 * @module core/signal-render
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/** Fraction of a levels strip given to the greyscale wedge (rest is the PLUGE/range cluster). */
export const STRIP_WEDGE_FRAC = 0.46;

/**
 * Quantise a signal fraction to an 8-bit limited-range preview code
 * (`docs/SIGNAL-SPEC.md` §6.2). Identical to the Rust `enc8`.
 *
 * @param {number} s - Signal fraction (0.0 = black, 1.0 = white; may exceed [0,1]).
 * @returns {number} 8-bit code, 0–255.
 */
export function enc8(s) {
  return Math.max(0, Math.min(255, Math.round(16 + 219 * s)));
}

// A region is [x, y, w, h] in normalised frame fractions.
const localX = (r, u) => Math.min(1, Math.max(0, (u - r[0]) / r[2]));
const localY = (r, v) => Math.min(1, Math.max(0, (v - r[1]) / r[3]));

const resolveBars = (b, defs) => (typeof b === 'string' ? defs.bars[b] : b);
const resolveStrip = (s, defs) => (typeof s === 'string' ? defs.strip[s] : s);

/**
 * Evaluate one fill at the normalised point (u, v).
 * @returns {number[]} [r, g, b] signal fractions.
 */
function evalFill(fill, region, u, v, defs) {
  if (fill.solid) return fill.solid;

  if (fill.gradient) {
    const g = fill.gradient;
    const t = g.axis === 'y' || g.axis === 'Y' ? localY(region, v) : localX(region, u);
    const s = g.from + (g.to - g.from) * t;
    return [s, s, s];
  }

  if (fill.bars !== undefined) {
    const list = resolveBars(fill.bars, defs);
    const idx = Math.min(list.length - 1, Math.floor(localX(region, u) * list.length));
    return list[idx];
  }

  if (fill.strip !== undefined) {
    const { wedge, cluster } = resolveStrip(fill.strip, defs);
    const lx = localX(region, u);
    if (lx < STRIP_WEDGE_FRAC) {
      const idx = Math.min(wedge.length - 1, Math.floor((lx / STRIP_WEDGE_FRAC) * wedge.length));
      const s = wedge[idx];
      return [s, s, s];
    }
    const sub = (lx - STRIP_WEDGE_FRAC) / (1 - STRIP_WEDGE_FRAC);
    const idx = Math.min(cluster.length - 1, Math.floor(sub * cluster.length));
    const s = cluster[idx];
    return [s, s, s];
  }

  return [0, 0, 0];
}

/**
 * Sample the ideal signal at normalised frame coordinates (u, v), both in [0, 1).
 * Layers composite top to bottom: the last layer covering the point wins.
 *
 * @param {object} spec - The pattern spec (layers + optional defs).
 * @returns {number[]} [r, g, b] signal fractions.
 */
export function sampleSpec(spec, u, v) {
  const defs = spec.defs || {};
  let out = [0, 0, 0];
  for (const layer of spec.layers) {
    const r = layer.region;
    if (u >= r[0] && u < r[0] + r[2] && v >= r[1] && v < r[1] + r[3]) {
      out = evalFill(layer.fill, r, u, v, defs);
    }
  }
  return out;
}

/**
 * Render the spec's static reference layer to an ImageData buffer at 8-bit.
 * Byte-for-byte identical to the Rust `render_rgba8` for the same spec and size.
 *
 * @param {object} spec - The pattern spec.
 * @param {number} width
 * @param {number} height
 * @returns {ImageData}
 */
export function renderSpecToImageData(spec, width, height) {
  const img = new ImageData(width, height);
  const d = img.data;
  for (let y = 0; y < height; y++) {
    const v = (y + 0.5) / height;
    for (let x = 0; x < width; x++) {
      const u = (x + 0.5) / width;
      const c = sampleSpec(spec, u, v);
      const p = (y * width + x) * 4;
      d[p] = enc8(c[0]);
      d[p + 1] = enc8(c[1]);
      d[p + 2] = enc8(c[2]);
      d[p + 3] = 255;
    }
  }
  return img;
}

/**
 * Paint the spec's static reference layer onto a canvas 2D context.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} spec
 * @param {number} width
 * @param {number} height
 */
export function renderSpecToCanvas(ctx, spec, width, height) {
  ctx.putImageData(renderSpecToImageData(spec, width, height), 0, 0);
}
