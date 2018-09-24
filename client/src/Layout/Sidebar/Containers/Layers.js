import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import defaultProps from 'recompose/defaultProps';
import Layers from '../Components/Layers';

export default compose(
    withHandlers({
        onLayerSelected: ({ onLayerSelected }) => ({ target }) => {
            onLayerSelected(parseInt(target.id));
        }
    })
)
(Layers);