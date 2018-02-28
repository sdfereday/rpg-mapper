import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import uniqueId from 'lodash/uniqueId';
import Grid from '../Components/Grid';
import { TILE_TYPES } from '../../../Consts/EditorConstants';

export default compose(
    withHandlers({
        onCellClicked: ({
            selectedTileType,
            selectedLayer,
            mapGridPlane,
            mapEntityPlane,
            onUpdateGrid
        }) => ({ target }) => {
            if(mapGridPlane.length === 0) {
                console.error("Map grid plane should be generated before continuing.");
                return;
            }

            const targetId = target.id;
            const gridData = selectedLayer === 0 ? [].concat(mapGridPlane) : [].concat(mapEntityPlane);
            const existingTile = gridData.find(tile => tile.id === targetId);

            if(gridData.length === 0 || !existingTile) {
                const tileProps = mapGridPlane.find(tile => tile.id === targetId);
                gridData.push({
                    id: uniqueId(),
                    ...tileProps,
                    selectedLayer,
                    t: selectedTileType
                });

                onUpdateGrid(gridData);
                return;
            }

            // Note to self: This isn't very optmised, could use quad-trees or something.
            const updatedGrid = gridData
                .map(tile => {
                    const { id, ...tileProps } = tile;
                    return id === targetId ? {
                        id,
                        ...tileProps,
                        selectedLayer,
                        t: selectedTileType
                    } : tile;
                });

            // Ensure that empties are removed if not the ground layer (needs a little work this bit)
            // TODO: use consts please for layers, perhaps make them more dynamic too.
            if(selectedLayer !== 0)
            {
                onUpdateGrid(updatedGrid.filter(x => x.t !== TILE_TYPES.EMPTY));
            } else {
                onUpdateGrid(updatedGrid);
            }
        }
    })
)
(Grid);