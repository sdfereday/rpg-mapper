import React from 'react';
import Radio from '../../../Common/Radio';

const TileTypeItemComponent = ({
    id,
    name,
    tileType,
    isChecked,
    onChange
}) => {
    return (
        <Radio
            id={id}
            value={id}
            name={name}
            tiletype={tileType}
            checked={isChecked}
            onChange={onChange}
        />
    )
}

export default TileTypeItemComponent;