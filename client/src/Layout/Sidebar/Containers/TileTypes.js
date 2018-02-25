import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import defaultProps from 'recompose/defaultProps';
import TileTypes from '../Components/TileTypes';

import { TILE_TYPES } from '../../../Consts/EditorConstants.js';

export default compose(
    withState('selectedType', 'setSelectedType', TILE_TYPES.EMPTY),
    withHandlers({
        onTileTypeSelected: ({ setSelectedLayer }) => ({ target }) => {
            console.log(target);
            setSelectedLayer(parseInt(target.tileType));
        }
    })
)
(TileTypes);