import React, {PropTypes} from 'react';

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