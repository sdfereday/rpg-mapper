import React from 'react';
import Draggable from 'react-draggable';
import Cell from '../Components/Cell';

const GridComponent = ({
    mapWidth,
    mapHeight,
    mapGridPlane,
    mapEntityPlane,
    onionMode,
    selectedTileType,
    selectedLayer,
    onCellClicked
}) => {
    const layerData = [mapGridPlane, mapEntityPlane];
    return (
        <div id="map">
            <div id="map-inner">
                {layerData && layerData.length ?
                    layerData.map((layerGrid, layerIndex) => {
                        return (
                            <div className={layerIndex > 0 && onionMode ? 'layer onion' : 'layer'} key={layerIndex}>
                                {layerGrid.map(({ id, x, y, t }, i) => {
                                    return (
                                        <Cell
                                            id={id}
                                            x={x}
                                            y={y}
                                            t={t}
                                            selectedLayer={selectedLayer}
                                            key={i}
                                            onCellClicked={onCellClicked}
                                        />
                                    );
                                })
                            }
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>

    )
}

export default GridComponent;