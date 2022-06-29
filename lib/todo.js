// currently including 'passive' settings i.e. no-preference
// we could only include user-defined settings i.e reduce, active, more
// there may still be value in knowing how many users have no preference
const mediaQueries = [
  { name: "prefers-reduced-motion", values: ["no-preference", "reduce"] },
  { name: "prefers-reduced-transparency", values: ["no-preference", "reduce"] },
  {
    name: "prefers-contrast",
    values: ["no-preference", "less", "more", "custom"],
  },
  { name: "forced-colors", values: ["none", "active"] },
  { name: "prefers-color-scheme", values: ["light", "dark"] },
  { name: "prefers-reduced-data", values: ["no-preference", "reduce"] },
];

// a collection of the media queries we'd probably be more interested in
const refinedMediaQueries = [
    { name: "prefers-reduced-motion", values: ["reduce"] },
    { name: "prefers-reduced-transparency", values: ["reduce"] },
    {
      name: "prefers-contrast",
      values: ["less", "more", "custom"],
    },
    { name: "forced-colors", values: ["active"] },
    { name: "prefers-color-scheme", values: ["light", "dark"] },
    { name: "prefers-reduced-data", values: ["reduce"] },
];

// need to turn each mq variation into a string to query
// i.e. (prefers-reduced-motion: reduce)
const mqs = refinedMediaQueries.map(mq => mq.values.map(v => `(${mq.name}: ${v})`)).flat();

const userPreferenceMqMatches = mqs.map(mq => window.matchMedia(mq)).filter(mq => mq.matches);