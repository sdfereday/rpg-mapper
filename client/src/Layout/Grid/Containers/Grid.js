import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import Grid from '../Components/Grid';

export default compose(
    withHandlers({
        onCellClicked: ({ selectedTileType, mapGridPlane, setMapGridPlane }) => ({ target }) => {
            const tx = target.getAttribute('x');
            const ty = target.getAttribute('y');
            const tt = target.getAttribute('t');
            console.log(tx, ty, tt);

            const updatedGrid = mapGridPlane.map(({ x, y }) => {
                console.log(tile);
                return x === tx && y === ty ? // ...
            });

        }
    })
)
(Grid);