import React, {PropTypes} from 'react';

const SidebarComponent = ({
    id,
    children
}) => {
    return (
        <div id={id}>
            {children}
        </div>
    )
}

export default SidebarComponent;