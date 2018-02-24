import React from 'react';

const Radio = ({
    id,
    name,
    value,
    checked,
    onChange
}) => {
    return (
        <div className="radio">
            <input type="radio" id={id} onChange={onChange} name={name} checked={checked} value={id} />
            <label htmlFor={id}>{name}</label>
            <div class="check"></div>
        </div>
    )
}

export default Radio;