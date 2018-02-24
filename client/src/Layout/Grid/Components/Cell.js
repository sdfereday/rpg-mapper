import React from 'react';

const CellComponent = ({
    x,
    y,
    decorType,
    asset,
    occupied,
    tileScale,
    onCellClicked
}) => {
    const tileX = x * tileScale + 'px';
    const tileY = y * tileScale + 'px';

    const cellStyle = {
        top: tileY,
        left: tileX,
        backgroundUrl: asset
    }

    return (
        <div className="sq" style={cellStyle} onClick={onCellClicked}>{decorType}</div>
    )
}

export default CellComponent;