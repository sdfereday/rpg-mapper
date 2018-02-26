import React from 'react';

const LabeledComponent = ({
    text,
    children,
}) => {
    return (
        <div className="node">
            {text}
            {children}
        </div>
    )
};

export default LabeledComponent;