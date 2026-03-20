/**********************************************************************
 * RANDOM FILENAME GENERATOR
 **********************************************************************/

const ADJECTIVES = [
  "affectionate","antibacterial","bespectacled","boastful","bouncy","buoyant","buttered",
  "cathartic","charismatic","classless","contaminated","cranky","creamy",
  "dainty","defeated","discordant","disembodied","euphoric",
  "fanciful","flirtatious","forlorn","freckled","fuzzy",
  "glossy","long-lost","long-necked","lumpy",
  "merciful","mossy","muscular","overpraised",
  "paranormal","pretentious","problematic","puritanical",
  "radiant","regurgitated","respectable",
  "screaming","self-important","shimmering","shiny","squishable",
  "unemployed","velvety","victorious","wiggly","woolly"
];

const NOUNS = [
  "alley-cat","apology","apparition","applause",
  "bambino","bassochord","biped","biscuit","bnuy",
  "carnivore","cartwheel","casserole","creature-of-the-night","critter","croissant","cupcake","curiosity",
  "delusion","destroyer","dumpling",
  "fatality","finger-puppet","floof","herbivore","hot-dog","invertebrate",
  "keepsake","lambchop","lapdog","lowlander","marsupial","no-thanks","noodle",
  "occupant","omen","pudding",
  "sea-slug","shawarma","shrimp","space-invader","spaghetti","stringworm",
  "thingamabob","torpedo","thumbs-up","yes-please"
];

const FLOURISHES = [
  "catastrophe","delight","disaster","extract","fiasco",
  "masterpiece","miracle","surprise","tragedy"
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