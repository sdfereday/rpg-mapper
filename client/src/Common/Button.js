import React from 'react';

const Button = ({
    text,
    isDisabled,
    onClick
}) => {
    const disabled = isDisabled ? 'disabled': '';
    return (
        <button onClick={onClick} disabled={disabled}>{text}</button>
    )
};

export default Button;