import React from 'react';
import Checkbox from '../../../Common/Checkbox';
import LayerItem from './LayerItem';

const LayersComponent = ({
    layers,
    selectedLayer,
    onionMode,
    onOnionSelected,
    onLayerSelected
}) => {
    return [
        <Checkbox
            id="onion-mode"
            label="Onion"
            key="onion-mode"
            checked={onionMode}
            onChange={onOnionSelected}
        />,
        <div className="layersList" key="layersList">
            {layers && layers.length &&
                layers.map((layer, i) => {
                    return (
                        <LayerItem
                            name="layer"
                            index={i}
                            key={i}
                            selectedLayer={selectedLayer}
                            onLayerSelected={onLayerSelected}
                        />
                    );
                })
            }
        </div>
    ]
}

export default LayersComponent;