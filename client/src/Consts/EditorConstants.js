export const TILE_SCALE = 32;

export const TILE_TYPES = {
    EMPTY: 0,
    FLOOR_TILE: 1,
    WALL_TILE: 2,
    PILLAR_DECOR: 3,
    WALL_DECOR: 4,
    KEY_SPAWN: 5,
    PUZZLE_SPAWN: 6,
    ENEMY_SPAWN: 7,
    TREASURE_SPAWN: 8,
    TRAP_SPAWN: 9,
    ENTRANCE: 10,
    EXIT: 11,
    AI_WAYPOINT: 12,
    SMASHABLE_DECOR: 13
};

export const BLANK = 'blank';
export const BOX = 'box';
export const MAZE = 'maze';
export const CELLULAR = 'cellular';
export const ROOM = 'room';

export const GENERATOR_TYPES = {
    BLANK,
    BOX,
    MAZE,
    CELLULAR,
    ROOM
}

export const TILE_MAPPINGS = [{
        id: "empty",
        name: "Empty",
        type: TILE_TYPES.EMPTY, 
        asset: "empty.png",
        allowedLayer: -1
    },
    {
        id: "floor",
        name: "Floor",
        type: TILE_TYPES.FLOOR_TILE, 
        asset: "floor.png",
        allowedLayer: 0
    },
    {
        id: "wall",
        name: "Wall",
        type: TILE_TYPES.WALL_TILE, 
        asset: "wall.png",
        allowedLayer: 0
    },
    {
        id: "pillar",
        name: "Pillar",
        type: TILE_TYPES.PILLAR_DECOR, 
        asset: "pillar.png",
        allowedLayer: 1
    },
    {
        id: "wallDecor",
        name: "Wall Decor",
        type: TILE_TYPES.WALL_DECOR, 
        asset: "wallDecor.png",
        allowedLayer: 1
    },
    {
        id: "key",
        name: "Key",
        type: TILE_TYPES.KEY_SPAWN, 
        asset: "key.png",
        allowedLayer: 1
    },
    {
        id: "puzzle",
        name: "Puzzle",
        type: TILE_TYPES.PUZZLE_SPAWN, 
        asset: "puzzle.png",
        allowedLayer: 1
    },
    {
        id: "enemy",
        name: "Enemy",
        type: TILE_TYPES.ENEMY_SPAWN, 
        asset: "enemy.png",
        allowedLayer: 1
    },
    {
        id: "treasure",
        name: "Treasure",
        type: TILE_TYPES.TREASURE_SPAWN, 
        asset: "treasure.png",
        allowedLayer: 1
    },
    {
        id: "trap",
        name: "Trap",
        type: TILE_TYPES.TRAP_SPAWN, 
        asset: "trap.png",
        allowedLayer: 1
    },
    {
        id: "entrance",
        name: "Entrance",
        type: TILE_TYPES.ENTRANCE, 
        asset: "entrance.png",
        allowedLayer: 1
    },
    {
        id: "exit",
        name: "Exit",
        type: TILE_TYPES.EXIT, 
        asset: "exit.png",
        allowedLayer: 1
    },
    {
        id: "aiWaypoint",
        name: "AI Waypoint",
        type: TILE_TYPES.AI_WAYPOINT, 
        asset: "aiWaypoint.png",
        allowedLayer: 1
    },
    {
        id: "smashableDecor",
        name: "Smashable Decor",
        type: TILE_TYPES.SMASHABLE_DECOR, 
        asset: "smashableDecor.png",
        allowedLayer: 1
    }
];
