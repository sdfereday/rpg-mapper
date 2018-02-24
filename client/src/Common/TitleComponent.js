import React from 'react';

const TitleComponent = ({
    title,
    version
}) => {
    return (
        <p className="lead">
            {title}
            <span>v{version}</span>
        </p>
    )
}

export default TitleComponent;