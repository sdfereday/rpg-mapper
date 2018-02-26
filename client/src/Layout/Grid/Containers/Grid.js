import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import Grid from '../Components/Grid';

export default compose(
    withHandlers({
        onCellClicked: ({ selectedTileType, selectedLayer, mapGridPlane, setMapGridPlane }) => ({ target }) => {
            const gridData = [].concat(mapGridPlane);
            const targetId = target.id;

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
 
            setMapGridPlane(updatedGrid);
        }
    })
)
(Grid);