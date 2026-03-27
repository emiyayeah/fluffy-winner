/**********************************************************************
 * 1) COLOR DATA
 * --------------------------------------------------------------------
 * ALL_COLORS contains every named color the painter knows about.
 * LIVE_COLOR_IDS contains the featured weekly set.
 *
 * IMPORTANT:
 * - ALL_COLORS is the master list
 * - LIVE_COLOR_IDS is a subset of ALL_COLORS
 * - BONUS colors are computed automatically as:
 *     all colors in ALL_COLORS that are NOT in LIVE_COLOR_IDS
 **********************************************************************/

const ALL_COLORS = [
  { id: "obsidian", hex: "#000000" },
  { id: "slate", hex: "#5b5a71" },
  { id: "shark grey", hex: "#787ca2" },
  { id: "pebble grey", hex: "#a2aac0" },
  { id: "dove grey", hex: "#dbeefd" },

  { id: "chestnut", hex: "#90513e" },
  { id: "salted caramel", hex: "#b67150" },
  { id: "camel", hex: "#df9d69" },
  { id: "honey mustard", hex: "#fee594" },
  { id: "parmesan", hex: "#ffffd1" },

  { id: "mulberry", hex: "#8c4371" },
  { id: "raspberry", hex: "#cf335a" },
  { id: "vermillion", hex: "#ff3e3a" },
  { id: "thangerine", hex: "#ff8e3f" },
  { id: "apricot", hex: "#ffc582" },

  { id: "purple plum", hex: "#70406f" },
  { id: "thistle", hex: "#bd4ca4" },
  { id: "dusty rose", hex: "#e96fa2" },
  { id: "peach cream", hex: "#ffc5b7" },
  { id: "intestines pink", hex: "#ff989f" },

  { id: "charcoal", hex: "#363441" },
  { id: "murky water", hex: "#3f617c" },
  { id: "teal", hex: "#259ebd" },
  { id: "aquamarine", hex: "#00eabf" },
  { id: "alien green", hex: "#13ff80" },

  { id: "indigo", hex: "#3f3862" },
  { id: "steel blue", hex: "#4c64ae" },
  { id: "cornflower blue", hex: "#559af9" },
  { id: "sky blue", hex: "#5ae8fe" },
  { id: "baby blue", hex: "#a8f9f9" },
  { id: "buttermilk", hex: "#ebffff" },
];

// Change these weekly to rotate the featured colors.
const LIVE_COLOR_IDS = [
  "indigo",
  "honey mustard",
  "buttermilk",
  "teal",
  "shark grey",
  "dove grey",
  "thangerine",
  "aquamarine",
];

// Special permanent "erase" swatch.
// This is not a real color in ALL_COLORS. It means "paint this cell white/blank."
const ERASE_ID = "__erase__";

// Turn ALL_COLORS into a map for fast lookup:
// colorId -> hex
const allById = new Map(ALL_COLORS.map(c => [c.id, c.hex]));

// Build live color objects in the order listed in LIVE_COLOR_IDS.
const LIVE_COLORS = LIVE_COLOR_IDS.map(id => {
  const hex = allById.get(id);
  if (!hex) {
    console.warn(`LIVE_COLOR_IDS includes "${id}" but it isn't in ALL_COLORS.`);
    return { id, hex: "#ff00ff" };
  }
  return { id, hex };
});

// Build bonus colors automatically:
// everything in ALL_COLORS that is NOT in LIVE_COLOR_IDS
const liveIdSet = new Set(LIVE_COLOR_IDS);
const BONUS_COLORS = ALL_COLORS.filter(c => !liveIdSet.has(c.id));