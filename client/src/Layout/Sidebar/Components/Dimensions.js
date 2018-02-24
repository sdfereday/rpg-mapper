import React, {PropTypes} from 'react';
import Input from '../../../Common/Input';
import Button from '../../../Common/Button';
import LabeledComponent from '../../../Common/LabeledComponent';

const DimensionsComponent = ({
    mapWidth,
    mapHeight,
    children,
    onMapDimensionsChanged,
    onMake
}) => {
    return [
        <LabeledComponent text="Width:" key="width">
            <Input
                id="mapWidth"
                value={mapWidth}
                onChange={onMapDimensionsChanged}
            />
        </LabeledComponent>,
        <LabeledComponent text="Height:" key="height">
            <Input
                id="mapHeight"
                value={mapHeight}
                onChange={onMapDimensionsChanged}
            />
        </LabeledComponent>,
        <Button onClick={onMake} text="make" key="make" />
    ]
}

export default DimensionsComponent;