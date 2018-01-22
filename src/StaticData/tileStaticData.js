define(['tileTypes'], function(tileTypes){

  // Tile type data (contains all graphical info, etc) - Expects each eType to always differ!
  return [{
    name: "empty",
    eType: tileTypes.EMPTY, // Corresponds to enums below.
    asset: "empty.png"
  },
  {
    name: "floor",
    eType: tileTypes.FLOOR_TILE, // Corresponds to enums below.
    asset: "floor.png"
  },
  {
    name: "wall",
    eType: tileTypes.WALL_TILE, // Corresponds to enums below.
    asset: "wall.png"
  },
  {
    name: "pillar",
    eType: tileTypes.PILLAR_DECOR, // Corresponds to enums below.
    asset: "pillar.png"
  },
  {
    name: "wallDecor",
    eType: tileTypes.WALL_DECOR, // Corresponds to enums below.
    asset: "wallDecor.png"
  },
  {
    name: "key",
    eType: tileTypes.KEY_SPAWN, // Corresponds to enums below.
    asset: "key.png"
  },
  {
    name: "puzzle",
    eType: tileTypes.PUZZLE_SPAWN, // Corresponds to enums below.
    asset: "puzzle.png"
  },
  {
    name: "enemy",
    eType: tileTypes.ENEMY_SPAWN, // Corresponds to enums below.
    asset: "enemy.png"
  },
  {
    name: "treasure",
    eType: tileTypes.TREASURE_SPAWN, // Corresponds to enums below.
    asset: "treasure.png"
  },
  {
    name: "trap",
    eType: tileTypes.TRAP_SPAWN, // Corresponds to enums below.
    asset: "trap.png"
  },
  {
    name: "entrance",
    eType: tileTypes.ENTRANCE, // Corresponds to enums below.
    asset: "entrance.png"
  },
  {
    name: "exit",
    eType: tileTypes.EXIT, // Corresponds to enums below.
    asset: "exit.png"
  }
];

});