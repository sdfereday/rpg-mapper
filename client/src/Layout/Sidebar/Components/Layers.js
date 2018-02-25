import React from 'react';
import Radio from '../../../Common/Radio';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';
import LabeledComponent from '../../../Common/LabeledComponent';

const LayersComponent = ({
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
        <LabeledComponent text="Current Layer:" key="use-layer">
            <Radio
                id="0"
                name="Bottom Layer"
                checked={selectedLayer === 0}
                onChange={onLayerSelected}
            />
            <Radio
                id="1"
                name="Middle Layer"
                checked={selectedLayer === 1}
                onChange={onLayerSelected}
            />
            <Radio
                id="2"
                name="Top Layer"
                checked={selectedLayer === 2}
                onChange={onLayerSelected}
            />
        </LabeledComponent>,
    ]
}

export default LayersComponent;