import React from 'react';
import TileTypeItem from './TileTypeItem';

import { TILE_MAPPINGS } from '../../../Consts/EditorConstants.js';

const TileTypesComponent = ({
    selectedTileType,
    selectedLayer,
    onTileTypeSelected
}) => {    
    return (
        <div className="tileTypesList">
            {TILE_MAPPINGS.map(({ id, type, name, allowedLayer }, i) => {
                    return (
                        allowedLayer === selectedLayer || allowedLayer === -1 ?
                        <TileTypeItem
                            id={name+type}
                            key={i}
                            tiletype={type}
                            name={name}
                            isChecked={selectedTileType === type}
                            onChange={onTileTypeSelected}
                        /> : null
                    );
                })
            }
        </div>
    )
}

export default TileTypesComponent;