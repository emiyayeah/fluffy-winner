/**********************************************************************
 * RANDOM FILENAME GENERATOR
 **********************************************************************/

const ADJECTIVES = [
  "affectionate","antibacterial","aristocratic","boingy","buoyant","buttered",
  "cathartic","charismatic","classless","contaminated","cranky","creamy",
  "dainty","discordant","disembodied","euphoric",
  "flirtatious","forlorn","freckled","fuzzy",
  "glossy","long-lost","long-necked","lumpy",
  "merciful","muscular","overpraised",
  "paranormal","pretentious","problematic","puritanical",
  "radiant","regurgitated","respectable",
  "screaming","self-important","shimmering","shiny","squishable",
  "tragic","unemployed","velvety","victorious","wiggly"
];

const NOUNS = [
  "alley-cat","apology","apparition","applause",
  "bassochord","biped","biscuit",
  "carnivore","cartwheel","casserole","creature-of-the-night","critter","croissant","cupcake","curiosity",
  "delusion","destroyer","dumpling",
  "fatality","finger-puppet","herbivore","hot-dog","invertebrate",
  "keepsake","lambchop","lapdog","lowlander","marsupial","no-thanks","noodle",
  "occupant","pudding",
  "sea-slug","shawarma","shrimp","space-invader","spaghetti","stringworm",
  "thingamabob","torpedo","thumbs-up","yes-please"
];

const FLOURISHES = [
  "catastrophe","delight","disaster","fiasco",
  "masterpiece","miracle","surprise","to-the-max"
];

function randomName() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  let name = `${a}-${n}`;

  // ~10% chance of a third word
  if (Math.random() < 0.1) {
    const f = FLOURISHES[Math.floor(Math.random() * FLOURISHES.length)];
    name += `-${f}`;
  }

  return name;
}
