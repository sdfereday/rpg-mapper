import React from 'react';
import Radio from '../../../Common/Radio';
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
                name="Floor Layer"
                checked={selectedLayer === 0}
                onChange={onLayerSelected}
            />
            <Radio
                id="1"
                name="Entity Layer"
                checked={selectedLayer === 2}
                onChange={onLayerSelected}
            />
        </LabeledComponent>,
    ]
}

export default LayersComponent;