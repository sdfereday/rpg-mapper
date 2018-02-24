import React from 'react';
import TileTypeItem from './TileTypeItem';

const TileTypesComponent = ({
    tileTypes,
    currentTileType,
    onTileTypeSelected
}) => {
    return (
        <div className="tileTypesList">
            {tileTypes && tileTypes.length &&
                tileTypes.map(({ type, name }, i) => {
                    return (
                        <TileTypeItem
                            key={i}
                            name={name}
                            checked={currentTileType === type}
                            onChange={onTileTypeSelected}
                        />
                    );
                })
            }
        </div>
    )
}

export default TileTypesComponent;