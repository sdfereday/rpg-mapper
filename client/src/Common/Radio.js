import React from 'react';

const Radio = ({
    id,
    name,
    value,
    checked,
    onChange,
    ...props
}) => {
    return (
        <div className="radio">
            <input type="radio"
                id={id}
                onChange={onChange}
                name={name}
                checked={checked}
                value={id}
                {...props}
            />
            <label htmlFor={id}>{name}</label>
            <div className="check"></div>
        </div>
    )
}

export default Radio;