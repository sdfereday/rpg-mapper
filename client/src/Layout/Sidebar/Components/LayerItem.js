import React from 'react';
import Radio from '../../../Common/Radio';
import Button from '../../../Common/Button';
import Input from '../../../Common/Input';

const LayerItemComponent = ({
    name,
    index,
    selectedLayer,
    onLayerRename,
    onLayerSelected
}) => {
    return(
        <div className="layerItem danger" onClick={onLayerSelected}>
            <Input value={name} onChange={onLayerRename} />
            <Button text="Hide" />
            <Button text="Remove" className="danger" />
        </div>
    )
}

export default LayerItemComponent;