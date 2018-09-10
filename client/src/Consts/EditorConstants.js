export const TILE_SCALE = 32;

export const TILE_TYPES = {
    EMPTY: 0,
    FLOOR_TILE: 1,
    WALL_TILE: 2

};

export const ENTITY_TYPES = {
    KEY: 1,
    HEALTH: 2,
    ENEMY: 3,
    DOOR: 4,
    TREASURE: 5
}

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
        id: "KEY",
        name: "KEY",
        type: ENTITY_TYPES.KEY,
        asset: "KEY.png",
        allowedLayer: 1
    },
    {
        id: "HEALTH",
        name: "HEALTH",
        type: ENTITY_TYPES.HEALTH,
        asset: "HEALTH.png",
        allowedLayer: 1
    },
    {
        id: "ENEMY",
        name: "ENEMY",
        type: ENTITY_TYPES.ENEMY,
        asset: "ENEMY.png",
        allowedLayer: 1
    },
    {
        id: "DOOR",
        name: "DOOR",
        type: ENTITY_TYPES.DOOR,
        asset: "DOOR.png",
        allowedLayer: 1
    },
    {
        id: "TREASURE",
        name: "TREASURE",
        type: ENTITY_TYPES.TREASURE,
        asset: "TREASURE.png",
        allowedLayer: 1
    }
];
