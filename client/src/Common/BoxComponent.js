import React, {PropTypes} from 'react';

const BoxComponent = ({
    title,
    intro,
    children
}) => {
    return (
        <div className="sidebarBox">
            <div className="sidebarBoxContent">
                <p>
                    <strong>{title}</strong>
                </p>
                <p>{intro}</p>
            </div>
            {children}
        </div>
    )
}

export default BoxComponent;