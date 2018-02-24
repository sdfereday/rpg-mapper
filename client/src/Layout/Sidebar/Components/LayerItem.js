import React, {PropTypes} from 'react';
import Checkbox from '../../../Common/Checkbox';

const LayerItemComponent = ({
    name,
    index,
    selectedLayer,
    onLayerSelected
}) => {
    return (
        <Checkbox
            id={name + index}
            label={name}
            checked={index === selectedLayer}
            onChange={onLayerSelected}
        />
    )
}

export default LayerItemComponent;