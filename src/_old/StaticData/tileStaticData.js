define(['tileTypes'], function(tileTypes){

  // Tile type data (contains all graphical info, etc) - Expects each eType to always differ!
  return [{
    id: "empty",
    name: "Empty",
    eType: tileTypes.EMPTY, // Corresponds to enums below.
    asset: "empty.png",
    allowedLayer: null
  },
  {
    id: "floor",
    name: "Floor",
    eType: tileTypes.FLOOR_TILE, // Corresponds to enums below.
    asset: "floor.png",
    allowedLayer: 0
  },
  {
    id: "wall",
    name: "Wall",
    eType: tileTypes.WALL_TILE, // Corresponds to enums below.
    asset: "wall.png",
    allowedLayer: 1
  },
  {
    id: "pillar",
    name: "Pillar",
    eType: tileTypes.PILLAR_DECOR, // Corresponds to enums below.
    asset: "pillar.png",
    allowedLayer: 2
  },
  {
    id: "wallDecor",
    name: "Wall Decor",
    eType: tileTypes.WALL_DECOR, // Corresponds to enums below.
    asset: "wallDecor.png",
    allowedLayer: 2
  },
  {
    id: "key",
    name: "Key",
    eType: tileTypes.KEY_SPAWN, // Corresponds to enums below.
    asset: "key.png",
    allowedLayer: 2
  },
  {
    id: "puzzle",
    name: "Puzzle",
    eType: tileTypes.PUZZLE_SPAWN, // Corresponds to enums below.
    asset: "puzzle.png",
    allowedLayer: 2
  },
  {
    id: "enemy",
    name: "Enemy",
    eType: tileTypes.ENEMY_SPAWN, // Corresponds to enums below.
    asset: "enemy.png",
    allowedLayer: 2
  },
  {
    id: "treasure",
    name: "Treasure",
    eType: tileTypes.TREASURE_SPAWN, // Corresponds to enums below.
    asset: "treasure.png",
    allowedLayer: 2
  },
  {
    id: "trap",
    name: "Trap",
    eType: tileTypes.TRAP_SPAWN, // Corresponds to enums below.
    asset: "trap.png",
    allowedLayer: 2
  },
  {
    id: "entrance",
    name: "Entrance",
    eType: tileTypes.ENTRANCE, // Corresponds to enums below.
    asset: "entrance.png",
    allowedLayer: 2
  },
  {
    id: "exit",
    name: "Exit",
    eType: tileTypes.EXIT, // Corresponds to enums below.
    asset: "exit.png",
    allowedLayer: 2
  },
  {
    id: "aiWaypoint",
    name: "AI Waypoint",
    eType: tileTypes.AI_WAYPOINT, // Corresponds to enums below.
    asset: "aiWaypoint.png",
    allowedLayer: 2
  },
  {
    id: "smashableDecor",
    name: "Smashable Decor",
    eType: tileTypes.SMASHABLE_DECOR, // Corresponds to enums below.
    asset: "smashableDecor.png",
    allowedLayer: 2
  }
];

});