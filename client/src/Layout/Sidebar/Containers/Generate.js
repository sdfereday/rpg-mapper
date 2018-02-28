import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import uniqueId from 'lodash/uniqueId';
import Generate from '../Components/Generate';
import ROT from '../../../../../custom_libraries/rot.min.js';

import {
    createGrid,
    createGridAsBox
} from '../../../utils/GridUtils';

import {
    BLANK,
    BOX,
    MAZE,
    CELLULAR,
    ROOM,
    GENERATOR_TYPES,
    TILE_TYPES
} from '../../../Consts/EditorConstants';

// TODO: Add ROT generators to utils also.
const GEN_MAP = {
    [BLANK]: {
        create(width, height) {
            return createGrid(width, height, TILE_TYPES.FLOOR_TILE);
        }
    },
    [BOX]: {
        create(width, height) {
            return createGridAsBox(width, height, TILE_TYPES.FLOOR_TILE, TILE_TYPES.WALL_TILE);
        }
    },
    [MAZE]: {
        create(width, height) {
            const cells = [];
            new ROT.Map.EllerMaze(width, height)
                .create((x, y, t) => cells.push({ x, y, t: t === TILE_TYPES.EMPTY ? TILE_TYPES.FLOOR_TILE : TILE_TYPES.WALL_TILE }));
            return cells;
        }
    },
    [CELLULAR]: {
        create(width, height) {
            const cells = [];
            const iterations = 4;
            const map = new ROT.Map.Cellular(width, height);

            map.randomize(0.5);
            for (let i = 0; i < iterations; i++) {
                map.create((x, y, t) => {
                    if(i >= iterations - 1) {
                        cells.push({ x, y, t: t === TILE_TYPES.EMPTY ? TILE_TYPES.WALL_TILE : TILE_TYPES.FLOOR_TILE })
                    }
                });
            }

            return cells;
        }
    },
    [ROOM]: {
        create(width, height) {
            const cells = [];
            new ROT.Map.Digger(width, height)
                .create((x, y, t) => cells.push({ x, y, t: t === TILE_TYPES.EMPTY ? TILE_TYPES.FLOOR_TILE : TILE_TYPES.WALL_TILE }));
            return cells;
        }
    }
}

export default compose(
    withState('currentMode', 'setCurrentMode', GENERATOR_TYPES.BLANK),
    withState('invalidValues', 'setInvalidValues', true),
    withPropsOnChange(['mapWidth', 'mapHeight'], (({ mapWidth, mapHeight, setInvalidValues}) => {
        const isInvalid = mapWidth === 0 || mapHeight === 0;
        setInvalidValues(isInvalid);
    })),
    withHandlers({
        onChangeCurrentMode: ({ currentMode, setCurrentMode }) => ({ target }) => {
            setCurrentMode(target.id);
        },
        onGenerate: ({ onMapGridPlane, currentMode, mapWidth, mapHeight, selectedLayer }) => () => {
            if(currentMode === ROOM && (mapWidth < 24 || mapHeight < 24)) {
                console.error("Setting less than 24 units in room mode may generate errors. Aborting.");
                return;
            }

            // Setup ground layer
            const map = GEN_MAP[currentMode]
                .create(mapWidth, mapHeight)
                .map((tile) => {
                    const { t, ...tileProps} = tile;
                    return {
                        id: uniqueId(),
                        t,
                        selectedLayer: t === TILE_TYPES.FLOOR_TILE || t === TILE_TYPES.WALL_TILE ? 0 : 1,
                        ...tileProps
                    }
                });

            onMapGridPlane(map);
        }
    })
)
(Generate);