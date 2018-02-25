import React from 'react';
import Input from '../../../Common/Input';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';
import LabeledComponent from '../../../Common/LabeledComponent';

const DimensionsComponent = ({
    mapWidth,
    mapHeight,
    children,
    invalidValues,
    onMapWidthChanged,
    onMapHeightChanged,
    onMake
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
        </LabeledComponent>,
        <Button onClick={onMake} isDisabled={invalidValues} text="Generate" key="make" />
    ]
}

export default DimensionsComponent;