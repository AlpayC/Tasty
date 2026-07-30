// TheMealDB's list.php?a=list now returns ~195 demonyms, but most of them have
// NO recipes (e.g. filter.php?a=Afghan -> {"meals":null}). Filtering by an empty
// area returns null and leaves the UI stuck on "loading". These are the areas
// that actually return recipes on the public v1 test key, verified via
// filter.php?a=<area>. Keep this list as the source for the area buttons instead
// of the raw API list.
export const AREAS = [
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Egyptian",
  "Filipino",
  "Greek",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
];

// Default area shown before the user picks one. Must be an area that has recipes
// (the old default "American" no longer returns any).
export const DEFAULT_AREA = "British";
