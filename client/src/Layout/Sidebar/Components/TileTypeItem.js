import React from 'react';
import Radio from '../../../Common/Radio';

const TileTypeItemComponent = ({
    id,
    name,
    isChecked,
    onChange
}) => {
    return (
        <Radio
            id={id}
            value={id}
            name={name}
            checked={isChecked}
            onChange={onChange}
        />
    )
}

export default TileTypeItemComponent;