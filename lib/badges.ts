/**
 * Gym badges are the one reference table on this site that does NOT come from
 * PokeAPI: there is no `/badge` resource, so this is hand-maintained from the
 * mainline games. Verify against Bulbapedia before editing.
 *
 * Alola is intentionally absent. Sun and Moon replaced gyms with island trials
 * and award Z-Crystals rather than badges, so there is no equivalent row.
 */

export type Badge = {
  order: number;
  name: string;
  leader: string;
  type: string;
  town: string;
  /** Version differences, joint leaders, and other caveats. */
  note?: string;
};

export type BadgeRegion = {
  region: string;
  generation: string;
  games: string;
  badges: Badge[];
  note?: string;
};

export const BADGE_REGIONS: BadgeRegion[] = [
  {
    region: "Kanto",
    generation: "Generation I",
    games: "Red, Blue, Yellow",
    badges: [
      {
        order: 1,
        name: "Boulder Badge",
        leader: "Brock",
        type: "rock",
        town: "Pewter City",
      },
      {
        order: 2,
        name: "Cascade Badge",
        leader: "Misty",
        type: "water",
        town: "Cerulean City",
      },
      {
        order: 3,
        name: "Thunder Badge",
        leader: "Lt. Surge",
        type: "electric",
        town: "Vermilion City",
      },
      {
        order: 4,
        name: "Rainbow Badge",
        leader: "Erika",
        type: "grass",
        town: "Celadon City",
      },
      {
        order: 5,
        name: "Soul Badge",
        leader: "Koga",
        type: "poison",
        town: "Fuchsia City",
      },
      {
        order: 6,
        name: "Marsh Badge",
        leader: "Sabrina",
        type: "psychic",
        town: "Saffron City",
      },
      {
        order: 7,
        name: "Volcano Badge",
        leader: "Blaine",
        type: "fire",
        town: "Cinnabar Island",
      },
      {
        order: 8,
        name: "Earth Badge",
        leader: "Giovanni",
        type: "ground",
        town: "Viridian City",
      },
    ],
  },
  {
    region: "Johto",
    generation: "Generation II",
    games: "Gold, Silver, Crystal",
    badges: [
      {
        order: 1,
        name: "Zephyr Badge",
        leader: "Falkner",
        type: "flying",
        town: "Violet City",
      },
      {
        order: 2,
        name: "Hive Badge",
        leader: "Bugsy",
        type: "bug",
        town: "Azalea Town",
      },
      {
        order: 3,
        name: "Plain Badge",
        leader: "Whitney",
        type: "normal",
        town: "Goldenrod City",
      },
      {
        order: 4,
        name: "Fog Badge",
        leader: "Morty",
        type: "ghost",
        town: "Ecruteak City",
      },
      {
        order: 5,
        name: "Storm Badge",
        leader: "Chuck",
        type: "fighting",
        town: "Cianwood City",
      },
      {
        order: 6,
        name: "Mineral Badge",
        leader: "Jasmine",
        type: "steel",
        town: "Olivine City",
      },
      {
        order: 7,
        name: "Glacier Badge",
        leader: "Pryce",
        type: "ice",
        town: "Mahogany Town",
      },
      {
        order: 8,
        name: "Rising Badge",
        leader: "Clair",
        type: "dragon",
        town: "Blackthorn City",
      },
    ],
  },
  {
    region: "Hoenn",
    generation: "Generation III",
    games: "Ruby, Sapphire, Emerald",
    badges: [
      {
        order: 1,
        name: "Stone Badge",
        leader: "Roxanne",
        type: "rock",
        town: "Rustboro City",
      },
      {
        order: 2,
        name: "Knuckle Badge",
        leader: "Brawly",
        type: "fighting",
        town: "Dewford Town",
      },
      {
        order: 3,
        name: "Dynamo Badge",
        leader: "Wattson",
        type: "electric",
        town: "Mauville City",
      },
      {
        order: 4,
        name: "Heat Badge",
        leader: "Flannery",
        type: "fire",
        town: "Lavaridge Town",
      },
      {
        order: 5,
        name: "Balance Badge",
        leader: "Norman",
        type: "normal",
        town: "Petalburg City",
      },
      {
        order: 6,
        name: "Feather Badge",
        leader: "Winona",
        type: "flying",
        town: "Fortree City",
      },
      {
        order: 7,
        name: "Mind Badge",
        leader: "Tate and Liza",
        type: "psychic",
        town: "Mossdeep City",
        note: "Double battle against both leaders",
      },
      {
        order: 8,
        name: "Rain Badge",
        leader: "Wallace or Juan",
        type: "water",
        town: "Sootopolis City",
        note: "Wallace in Ruby and Sapphire, Juan in Emerald",
      },
    ],
  },
  {
    region: "Sinnoh",
    generation: "Generation IV",
    games: "Diamond, Pearl, Platinum",
    badges: [
      {
        order: 1,
        name: "Coal Badge",
        leader: "Roark",
        type: "rock",
        town: "Oreburgh City",
      },
      {
        order: 2,
        name: "Forest Badge",
        leader: "Gardenia",
        type: "grass",
        town: "Eterna City",
      },
      {
        order: 3,
        name: "Cobble Badge",
        leader: "Maylene",
        type: "fighting",
        town: "Veilstone City",
      },
      {
        order: 4,
        name: "Fen Badge",
        leader: "Crasher Wake",
        type: "water",
        town: "Pastoria City",
      },
      {
        order: 5,
        name: "Relic Badge",
        leader: "Fantina",
        type: "ghost",
        town: "Hearthome City",
        note: "Challenged earlier in the order in Platinum",
      },
      {
        order: 6,
        name: "Mine Badge",
        leader: "Byron",
        type: "steel",
        town: "Canalave City",
      },
      {
        order: 7,
        name: "Icicle Badge",
        leader: "Candice",
        type: "ice",
        town: "Snowpoint City",
      },
      {
        order: 8,
        name: "Beacon Badge",
        leader: "Volkner",
        type: "electric",
        town: "Sunyshore City",
      },
    ],
  },
  {
    region: "Unova",
    generation: "Generation V",
    games: "Black, White",
    badges: [
      {
        order: 1,
        name: "Trio Badge",
        leader: "Cilan, Chili or Cress",
        type: "grass",
        town: "Striaton City",
        note: "The leader you face depends on your starter",
      },
      {
        order: 2,
        name: "Basic Badge",
        leader: "Lenora",
        type: "normal",
        town: "Nacrene City",
      },
      {
        order: 3,
        name: "Insect Badge",
        leader: "Burgh",
        type: "bug",
        town: "Castelia City",
      },
      {
        order: 4,
        name: "Bolt Badge",
        leader: "Elesa",
        type: "electric",
        town: "Nimbasa City",
      },
      {
        order: 5,
        name: "Quake Badge",
        leader: "Clay",
        type: "ground",
        town: "Driftveil City",
      },
      {
        order: 6,
        name: "Jet Badge",
        leader: "Skyla",
        type: "flying",
        town: "Mistralton City",
      },
      {
        order: 7,
        name: "Freeze Badge",
        leader: "Brycen",
        type: "ice",
        town: "Icirrus City",
      },
      {
        order: 8,
        name: "Legend Badge",
        leader: "Drayden or Iris",
        type: "dragon",
        town: "Opelucid City",
        note: "Drayden in Black, Iris in White",
      },
    ],
  },
  {
    region: "Kalos",
    generation: "Generation VI",
    games: "X, Y",
    badges: [
      {
        order: 1,
        name: "Bug Badge",
        leader: "Viola",
        type: "bug",
        town: "Santalune City",
      },
      {
        order: 2,
        name: "Cliff Badge",
        leader: "Grant",
        type: "rock",
        town: "Cyllage City",
      },
      {
        order: 3,
        name: "Rumble Badge",
        leader: "Korrina",
        type: "fighting",
        town: "Shalour City",
      },
      {
        order: 4,
        name: "Plant Badge",
        leader: "Ramos",
        type: "grass",
        town: "Coumarine City",
      },
      {
        order: 5,
        name: "Voltage Badge",
        leader: "Clemont",
        type: "electric",
        town: "Lumiose City",
      },
      {
        order: 6,
        name: "Fairy Badge",
        leader: "Valerie",
        type: "fairy",
        town: "Laverre City",
      },
      {
        order: 7,
        name: "Psychic Badge",
        leader: "Olympia",
        type: "psychic",
        town: "Anistar City",
      },
      {
        order: 8,
        name: "Iceberg Badge",
        leader: "Wulfric",
        type: "ice",
        town: "Snowbelle City",
      },
    ],
  },
  {
    region: "Galar",
    generation: "Generation VIII",
    games: "Sword, Shield",
    badges: [
      {
        order: 1,
        name: "Grass Badge",
        leader: "Milo",
        type: "grass",
        town: "Turffield",
      },
      {
        order: 2,
        name: "Water Badge",
        leader: "Nessa",
        type: "water",
        town: "Hulbury",
      },
      {
        order: 3,
        name: "Fire Badge",
        leader: "Kabu",
        type: "fire",
        town: "Motostoke",
      },
      {
        order: 4,
        name: "Fighting or Ghost Badge",
        leader: "Bea or Allister",
        type: "fighting",
        town: "Stow-on-Side",
        note: "Bea in Sword, Allister in Shield",
      },
      {
        order: 5,
        name: "Fairy Badge",
        leader: "Opal",
        type: "fairy",
        town: "Ballonlea",
      },
      {
        order: 6,
        name: "Rock or Ice Badge",
        leader: "Gordie or Melony",
        type: "rock",
        town: "Circhester",
        note: "Gordie in Sword, Melony in Shield",
      },
      {
        order: 7,
        name: "Dark Badge",
        leader: "Piers",
        type: "dark",
        town: "Spikemuth",
      },
      {
        order: 8,
        name: "Dragon Badge",
        leader: "Raihan",
        type: "dragon",
        town: "Hammerlocke",
      },
    ],
  },
  {
    region: "Paldea",
    generation: "Generation IX",
    games: "Scarlet, Violet",
    note: "Paldea gyms can be taken in any order. The numbering below is the recommended level progression, not a required sequence.",
    badges: [
      {
        order: 1,
        name: "Bug Badge",
        leader: "Katy",
        type: "bug",
        town: "Cortondo",
      },
      {
        order: 2,
        name: "Grass Badge",
        leader: "Brassius",
        type: "grass",
        town: "Artazon",
      },
      {
        order: 3,
        name: "Electric Badge",
        leader: "Iono",
        type: "electric",
        town: "Levincia",
      },
      {
        order: 4,
        name: "Water Badge",
        leader: "Kofu",
        type: "water",
        town: "Cascarrafa",
      },
      {
        order: 5,
        name: "Normal Badge",
        leader: "Larry",
        type: "normal",
        town: "Medali",
      },
      {
        order: 6,
        name: "Ghost Badge",
        leader: "Ryme",
        type: "ghost",
        town: "Montenevera",
      },
      {
        order: 7,
        name: "Psychic Badge",
        leader: "Tulip",
        type: "psychic",
        town: "Alfornada",
      },
      {
        order: 8,
        name: "Ice Badge",
        leader: "Grusha",
        type: "ice",
        town: "Glaseado",
      },
    ],
  },
];
