import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import TileTypes from '../Components/TileTypes';

export default compose(
    withHandlers({
        onTileTypeSelected: ({ setSelectedTileType }) => ({ target }) => {
            setSelectedTileType(parseInt(target.getAttribute('tiletype')));
        }
    })
)
(TileTypes);