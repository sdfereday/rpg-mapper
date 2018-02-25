import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import defaultProps from 'recompose/defaultProps';
import ROTComponent from '../Components/ROTComponent';

import { createGrid } from '../../../utils/GridUtils.js';
import { ROT_TYPES } from '../../../Consts/EditorConstants.js';

export default compose(
    withState('currentMode', 'setCurrentMode', ROT_TYPES.MAZE),
    withState('swapSpace', 'setSwapSpace', false),
    withHandlers({
        onChangeCurrentMode: ({ currentMode, setCurrentMode }) => ({ target }) => {
            setCurrentMode(target.id);
        },
        onSwapSpace: ({ swapSpace, setSwapSpace }) => () => {
            setSwapSpace(!swapSpace);
        },
        onGenerate: ({ onMapGridPlane, currentMode, mapWidth, mapHeight }) => () => {
            console.log("Generate using " + currentMode + " mode.");
            //const rawGrid = createGrid(mapWidth, mapHeight);
            //onMapGridPlane(rawGrid);
        }
    })
)
(ROTComponent);