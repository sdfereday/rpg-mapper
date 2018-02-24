import React from 'react';
import Input from '../../../Common/Input';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';
import LabeledComponent from '../../../Common/LabeledComponent';

const DimensionsComponent = ({
    mapWidth,
    mapHeight,
    children,
    useROT,
    invalidValues,
    onUseROT,
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
        <LabeledComponent key="use-rot">
            <Checkbox
                id="useRot"
                label="Use ROT maze?"
                checked={useROT}
                onChange={onUseROT}
            />
        </LabeledComponent>,
        <Button onClick={onMake} isDisabled={invalidValues} text="make" key="make" />
    ]
}

export default DimensionsComponent;