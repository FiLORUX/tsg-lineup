/**
 * The `ebu-lineup` pattern spec — browser copy of the canonical signal master.
 *
 * Kept identical to `tsg-lineup-tauri/src-tauri/src/signal/ebu-lineup.json`
 * (the Rust crate's copy). Both feed the same signal-domain renderer; the SDI
 * wire and this preview are two encodes of this one definition. When the two
 * copies are eventually unified into a single shared file, this re-export goes
 * away.
 *
 * @module core/ebu-lineup-spec
 */
export const EBU_LINEUP = {
  id: 'ebu-lineup',
  system: { primaries: 'BT709', domain: 'display-signal' },
  layers: [
    { region: [0.0, 0.0, 1.0, 0.65], fill: { bars: 'ebu75' } },
    { region: [0.0, 0.65, 1.0, 0.05], fill: { strip: 'levels' } },
    { region: [0.0, 0.7, 1.0, 0.05], fill: { gradient: { axis: 'x', from: 0.0, to: 1.0 } } },
    { region: [0.0, 0.75, 1.0, 0.25], fill: { solid: [0.75, 0.0, 0.0] } },
  ],
  defs: {
    bars: {
      ebu75: [
        [1.0, 1.0, 1.0],
        [0.75, 0.75, 0.0],
        [0.0, 0.75, 0.75],
        [0.0, 0.75, 0.0],
        [0.75, 0.0, 0.75],
        [0.75, 0.0, 0.0],
        [0.0, 0.0, 0.75],
      ],
    },
    strip: {
      levels: {
        wedge: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
        cluster: [-0.055, 0.0, -0.02, 0.02, 1.0, 1.087],
      },
    },
  },
};

export default EBU_LINEUP;
