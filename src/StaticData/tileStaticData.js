define(['tileTypes'], function(tileTypes){

  // Tile type data (contains all graphical info, etc) - Expects each eType to always differ!
  return [{
    name: "floor",
    eType: tileTypes.FLOOR_TILE, // Corresponds to enums below.
    asset: "../blockimg.jpg"
  },
  {
    name: "wall",
    eType: tileTypes.WALL_TILE, // Corresponds to enums below.
    asset: "../blockimg.jpg"
  },
  {
    name: "pillar",
    eType: tileTypes.PILLAR_DECOR, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "wallDecor",
    eType: tileTypes.WALL_DECOR, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "key",
    eType: tileTypes.KEY_SPAWN, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "puzzle",
    eType: tileTypes.PUZZLE_SPAWN, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "enemy",
    eType: tileTypes.ENEMY_SPAWN, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "treasure",
    eType: tileTypes.TREASURE_SPAWN, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "trap",
    eType: tileTypes.TRAP_SPAWN, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "entrance",
    eType: tileTypes.ENTRANCE, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  },
  {
    name: "exit",
    eType: tileTypes.EXIT, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  }
];

});