import React from 'react';
import Input from '../../../Common/Input';
import LabeledComponent from '../../../Common/LabeledComponent';

const DimensionsComponent = ({
    mapWidth,
    mapHeight,
    onMapWidthChanged,
    onMapHeightChanged
}) => {
    return [
        <LabeledComponent text="Width:" key="width">
            <Input
                id="mapWidth"
                value={mapWidth}
                onChange={onMapWidthChanged}
            />
        </LabeledComponent>,
        <LabeledComponent text="Height:" key="height">
            <Input
                id="mapHeight"
                value={mapHeight}
                onChange={onMapHeightChanged}
            />
        </LabeledComponent>
    ]
}

export default DimensionsComponent;