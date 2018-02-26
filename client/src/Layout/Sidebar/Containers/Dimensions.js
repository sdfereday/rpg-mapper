import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Dimensions from '../Components/Dimensions';

export default compose(
    withState('invalidValues', 'setInvalidValues', true),
    withHandlers({
        onMapWidthChanged: ({ setMapWidth, setInvalidValues, mapHeight }) => (proxy) => {
            const parsedWidth = parseInt(proxy.target.value);
            setInvalidValues(!parsedWidth || !mapHeight);
            setMapWidth(parsedWidth);
        },
        onMapHeightChanged: ({ setMapHeight, setInvalidValues, mapWidth }) => (proxy) => {
            const parsedHeight = parseInt(proxy.target.value);
            setInvalidValues(!parsedHeight || !mapWidth);
            setMapHeight(parsedHeight);
        }
    })
)
(Dimensions);