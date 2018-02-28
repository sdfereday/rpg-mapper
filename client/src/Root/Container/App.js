import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import App from '../Component/App';

import {
    TILE_TYPES
} from '../../Consts/EditorConstants.js';

export default compose(
    withState('mapWidth', 'setMapWidth', 5),
    withState('mapHeight', 'setMapHeight', 5),
    withState('mapGridPlane', 'setMapGridPlane', []),
    withState('mapEntityPlane', 'setMapEntityPlane', []),
    withState('exitRequirements', 'setExitRequirements', []),
    withState('selectedLayer', 'setSelectedLayer', 0),
    withState('selectedTileType', 'setSelectedTileType', TILE_TYPES.EMPTY),
    withHandlers({
        onMapGridPlane: ({ setMapGridPlane, setMapEntityPlane, selectedLayer }) => (gridData) => {
            if(selectedLayer === 0) {
                setMapGridPlane(gridData);
            }
        },
        onUpdateGrid: ({ selectedLayer, setMapGridPlane, setMapEntityPlane }) => (gridData) => {
            if(selectedLayer === 0) {
                setMapGridPlane(gridData);
            } else {
                setMapEntityPlane(gridData);
            }
        }
    })
)
(App);