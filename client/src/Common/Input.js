import React, {PropTypes} from 'react';

const Input = ({
    id,
    value,
    onChange
}) => {
    return (
        <input type="text" id={id} value={value} onChange={onChange} />
    )
};

export default Input;