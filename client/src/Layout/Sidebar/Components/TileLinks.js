import React from 'react';
import Checkbox from '../../../Common/Checkbox';

import { TILE_MAPPINGS } from '../../../Consts/EditorConstants.js';

const getTileNameByType = (t) => {
    const { name } = TILE_MAPPINGS.find(({ type }) => type === t);
    return name ? name : null; 
};

const ExitTileData = ({
    id, x, y, t
}) => {
    return [
        <span key="exitTileId">Id: {id}</span>,
        <span key="exitTileTitle">Name: {getTileNameByType(t)}</span>,
        <span key="exitTilePos">Position: ({x},{y})</span>
    ]
}

const TileLinksComponent = ({
    exitTile,
    eligibleTiles,
    exitRequirements,
    onTileToggled
}) => {
    return (
        <div className="tileLinks">
            <p>
                <strong>Exit Tile:</strong>
            </p>
            <div className="primaryTile">
                <p>
                    {exitTile ? <ExitTileData {...exitTile} /> : 'No exit tile was found.'}
                </p>
                <ul>
                    {exitTile && eligibleTiles &&
                        eligibleTiles.map(({ id, t, x, y }, i) => {
                            return (
                                <li key={i}>
                                    <div className="left">
                                        <Checkbox
                                            id={id}
                                            checked={exitRequirements.some(x => x === id)}
                                            onChange={onTileToggled}
                                        />
                                    </div>
                                    <div className="right">
                                        <span key="exitTileId">Id: {id}</span>
                                        <span key="exitTileTitle">Name: {getTileNameByType(t)}</span>
                                        <span key="exitTilePos">Position: ({x},{y})</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default TileLinksComponent;