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
  { id: "obsidian", hex: "#000000", code: "A" },
  { id: "slate", hex: "#5b5a71", code: "B" },
  { id: "shark grey", hex: "#787ca2", code: "C" },
  { id: "pebble", hex: "#a2aac0", code: "D" },
  { id: "dove grey", hex: "#dbeefd", code: "E" },

  { id: "chestnut", hex: "#90513e", code: "F" },
  { id: "salted caramel", hex: "#b67150", code: "G" },
  { id: "camel", hex: "#df9d69", code: "H" },
  { id: "honey mustard", hex: "#fee594", code: "I" },
  { id: "parmesan", hex: "#ffffd1", code: "J" },

  { id: "mulberry", hex: "#8c4371", code: "K" },
  { id: "raspberry", hex: "#cf335a", code: "L" },
  { id: "vermillion", hex: "#ff3e3a", code: "M" },
  { id: "thangerine", hex: "#ff8e3f", code: "N" },
  { id: "apricot", hex: "#ffc582", code: "O" },

  { id: "purple plum", hex: "#70406f", code: "P" },
  { id: "thistle", hex: "#bd4ca4", code: "Q" },
  { id: "dusty rose", hex: "#e96fa2", code: "R" },
  { id: "peach", hex: "#ffc5b7", code: "S" },
  { id: "intestines pink", hex: "#ff989f", code: "T" },

  { id: "charcoal", hex: "#363441", code: "U" },
  { id: "murky water", hex: "#3f617c", code: "V" },
  { id: "teal", hex: "#259ebd", code: "W" },
  { id: "aquamarine", hex: "#00eabf", code: "X" },
  { id: "alien green", hex: "#13ff80", code: "Y" },

  { id: "indigo", hex: "#3f3862", code: "Z" },
  { id: "steel blue", hex: "#4c64ae", code: "a" },
  { id: "cornflower blue", hex: "#559af9", code: "b" },
  { id: "sky blue", hex: "#5ae8fe", code: "c" },
  { id: "baby blue", hex: "#a8f9f9", code: "d" },
  { id: "buttermilk", hex: "#ebffff", code: "e" },
];

// Change these weekly to rotate the featured colors.
const LIVE_COLOR_IDS = [
  "vermillion",
  "apricot",
  "thangerine",
  "dusty rose",
  "peach",
  "purple plum",
  "thistle",
  "intestines pink",
];

// Special permanent "erase" swatch.
// This is not a real color in ALL_COLORS. It means "paint this cell white/blank."
const ERASE_ID = "__erase__";

// Turn ALL_COLORS into a map for fast lookup:
// colorId -> hex
const allById = new Map(ALL_COLORS.map(c => [c.id, c.hex]));
const codeById = new Map(ALL_COLORS.map(c => [c.id, c.code]));
const idByCode = new Map(ALL_COLORS.map(c => [c.code, c.id]));

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
