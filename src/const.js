const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREND: `beforend`
};

const color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = Object.values(color);

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`,
};

export {RenderPosition, color, COLORS, DAYS, FilterType};
