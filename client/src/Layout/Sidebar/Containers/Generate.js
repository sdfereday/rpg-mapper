import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import Generate from '../Components/Generate';
import ROT from '../../../../../custom_libraries/rot.min.js';

import { createGrid } from '../../../utils/GridUtils';
import {
    BLANK,
    MAZE,
    ROOM,
    GENERATOR_TYPES,
    TILE_TYPES
} from '../../../Consts/EditorConstants';

const GEN_MAP = {
    [BLANK]: {
        create(width, height) {
            return createGrid(width, height, TILE_TYPES.EMPTY);
        }
    },
    [MAZE]: { 
        create(width, height) {
            const cells = [];
            new ROT.Map.EllerMaze(width, height)
                .create((x, y, t) => cells.push({ x, y, t }));
            return cells;
        }
    },
    [ROOM]: { 
        create(width, height) {
            const cells = [];
            new ROT.Map.Digger(width, height)
                .create((x, y, t) => cells.push({ x, y, t }));
            return cells;
        }
    }
}

export default compose(
    withState('currentMode', 'setCurrentMode', GENERATOR_TYPES.BLANK),
    withState('swapSpace', 'setSwapSpace', false),
    withState('invalidValues', 'setInvalidValues', true),
    withPropsOnChange(['mapWidth', 'mapHeight'], (({ mapWidth, mapHeight, setInvalidValues}) => {
        const isInvalid = mapWidth === 0 || mapHeight === 0;
        setInvalidValues(isInvalid);
    })),
    withHandlers({
        onChangeCurrentMode: ({ currentMode, setCurrentMode }) => ({ target }) => {
            setCurrentMode(target.id);
        },
        onSwapSpace: ({ swapSpace, setSwapSpace }) => () => {
            setSwapSpace(!swapSpace);
        },
        onGenerate: ({ onMapGridPlane, currentMode, mapWidth, mapHeight, swapSpace }) => () => {
            if(currentMode === ROOM && (mapWidth < 24 || mapHeight < 24)) {
                console.error("Setting less than 24 units in room mode may generate errors. Aborting.");
                return;
            }

            const map = GEN_MAP[currentMode].create(mapWidth, mapHeight);

            if(swapSpace) {
                const swappedMap = [].concat(map).map(({ t, ...props }) => {
                    return {
                        t: t ? 0 : 1,
                        ...props
                    }
                });
                onMapGridPlane(swappedMap);
                return;
            }

            onMapGridPlane(map);
        }
    })
)
(Generate);