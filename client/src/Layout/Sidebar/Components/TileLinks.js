import React from 'react';
import Checkbox from '../../../Common/Checkbox';

import { TILE_MAPPINGS } from '../../../Consts/EditorConstants.js';

const ExitTileData = ({
    exitTileTitle,
    exitTilePos,
    exitTileId
}) => {
    return [
        <span key="exitTileTitle">Name: {exitTileTitle}</span>,
        <span key="exitTilePos">Position: {exitTilePos}</span>,
        <span key="exitTileId">Id: {exitTileId}</span>
    ]
}

const TileLinksComponent = ({
    exitTileTitle,
    exitTilePos,
    exitTileId,
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
                    {exitTileId ?
                        <ExitTileData
                            exitTileTitle={exitTileTitle}
                            exitTilePos={exitTilePos}
                            exitTileId={exitTileId}
                        /> : 'No exit tile was found.'
                    }
                </p>
                <ul>
                    {eligibleTiles && eligibleTiles.map(({ id, name, position }, i) =>
                        {
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
                                        <span>Name: {name}</span>
                                        <span>Position: {position}</span>
                                        <span>Id: {id}</span>
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