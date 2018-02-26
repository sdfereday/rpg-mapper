import React from 'react';
import Radio from '../../../Common/Radio';

const TileTypeItemComponent = ({
    id,
    name,
    tiletype,
    isChecked,
    onChange
}) => {
    return (
        <Radio
            id={id}
            value={id}
            name={name}
            tiletype={tiletype}
            checked={isChecked}
            onChange={onChange}
        />
    )
}

export default TileTypeItemComponent;