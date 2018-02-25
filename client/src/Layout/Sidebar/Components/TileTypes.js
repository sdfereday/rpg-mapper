import React from 'react';
import TileTypeItem from './TileTypeItem';

import { TILE_MAPPINGS } from '../../../Consts/EditorConstants.js';

const TileTypesComponent = ({
    selectedType,
    selectedLayer,
    onTileTypeSelected
}) => {    
    return (
        <div className="tileTypesList">
            {TILE_MAPPINGS.map(({ id, type, name, allowedLayer }, i) => {
                    return (
                        allowedLayer === selectedLayer || allowedLayer === -1 ?
                        <TileTypeItem
                            key={i}
                            tileType={type}
                            name={name}
                            isChecked={selectedType === type}
                            onChange={onTileTypeSelected} Why wont this fire???
                        /> : null
                    );
                })
            }
        </div>
    )
}

export default TileTypesComponent;