import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import App from '../Component/App';

import {
    TILE_TYPES
} from '../../Consts/EditorConstants.js';

export default compose(
    withState('mapWidth', 'setMapWidth', 13),
    withState('mapHeight', 'setMapHeight', 13),
    withState('mapGridPlane', 'setMapGridPlane', []),
    withState('exitRequirements', 'setExitRequirements', []),
    withState('selectedLayer', 'setSelectedLayer', 0),
    withState('selectedTileType', 'setSelectedTileType', TILE_TYPES.EMPTY),
    withHandlers({
        onMapGridPlane: ({ setMapGridPlane }) => (gridData) => {
            setMapGridPlane(gridData);
        }
    })
)
(App);