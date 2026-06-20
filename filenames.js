/**********************************************************************
 * RANDOM FILENAME GENERATOR
 **********************************************************************/

const ADJECTIVES = [
  "affectionate","antibacterial","aristocratic","boingy","buoyant","buttered",
  "cathartic","charismatic","classless","contaminated","cranky","creamy",
  "dainty","discordant","disembodied","euphoric",
  "flirtatious","forlorn","freckled","fuzzy",
  "long-lost","long-necked",
  "merciful","muscular",
  "paranormal","pretentious","problematic","puritanical",
  "radiant","regurgitated","respectable",
  "screaming","self-important","shimmering","shiny","squishable",
  "tragic","unemployed",
  "interim",
  "bureaucratic",
  "suboptimal",
  "emergency",
  "unlicensed",
  "momentous",
  "haunted",
  "unremarkable",
  "wet",
  "intentional",
  "suspicious","cautious",
  "apologetic","unauthorized",
  "mostly-a"
];

const NOUNS = [
  "bassochord","biped","biscuit","bureaucrat",
  "carnivore","cartwheel","casserole","committee-member","creature-of-the-night","critter","croissant","cupcake","curiosity",
  "delusion","destroyer","disco-ring",dumpling",
  "firstborn","finger-puppet","herbivore","hot-dog","invertebrate",
  "keepsake","lambchop","lapdog","lasagna","lowlander","marsupial","no-thanks","noodle",
  "placeholder","pudding","round-of-applause",
  "sea-slug","shawarma","shrimp","snack","space-invader","spaghetti","stringworm",
  "thingamabob","torpedo","thumbs-up","tooth","yes-please"
];

const FLOURISHES = [
  "apologist","catastrophe","champion","collector","delight","denier","disaster","enthusiast","fiasco",
  "fanatic","masterpiece","miracle","surprise","to-the-max"
];

function randomName() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  let name = `${a}-${n}`;

  // ~15% chance of a third word
  if (Math.random() < 0.15) {
    const f = FLOURISHES[Math.floor(Math.random() * FLOURISHES.length)];
    name += `-${f}`;
  }

  return name;
}
