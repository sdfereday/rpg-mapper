import React from 'react';

const Button = ({
    text,
    isDisabled,
    className,
    onClick
}) => {
    const disabled = isDisabled ? 'disabled': '';
    return (
        <button className={className} onClick={onClick} disabled={disabled}>{text}</button>
    )
};

export default Button;