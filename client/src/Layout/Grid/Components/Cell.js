import React from 'react';
import uniqueId from 'lodash/uniqueId';

import {
    TILE_MAPPINGS,
    TILE_SCALE,
    TILE_TYPES
} from '../../../Consts/EditorConstants.js';

const getAssetUrlByType = (t) => {
    const { asset } = TILE_MAPPINGS.find(({ type }) => type === t);
    return asset ? asset : null; 
};

const CellComponent = ({
    x,
    y,
    t,
    onCellClicked
}) => {
    const tileX = x * TILE_SCALE + 'px';
    const tileY = y * TILE_SCALE + 'px';

    const cellStyle = {
        top: tileX,
        left: tileY,
        backgroundUrl: getAssetUrlByType(t)
    };

    const className = t !== TILE_TYPES.EMPTY ? 'sq occupied' : 'sq';

    return (
        <div
            id={uniqueId()}
            t={t}
            x={x}
            y={y}
            className={className}
            style={cellStyle}
            onClick={onCellClicked}>
                {t}
        </div>
    )
}

export default CellComponent;