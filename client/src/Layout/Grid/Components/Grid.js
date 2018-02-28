import React from 'react';
import Draggable from 'react-draggable';
import Cell from '../Components/Cell';

const GridComponent = ({
    mapWidth,
    mapHeight,
    mapGridPlane,
    mapEntityPlane,
    selectedTileType,
    selectedLayer,
    onCellClicked
}) => {
    const layerData = [mapGridPlane, mapEntityPlane];
    return (
        <div id="map">
            <Draggable
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[mapWidth, mapHeight]}
            >
                <div id="map-inner">
                    {layerData && layerData.length ?
                        layerData.map((layerGrid, layerIndex) => {
                            return (
                                <div className="layer" key={layerIndex}>
                                    {layerGrid.map(({ id, x, y, t }, i) => {
                                        return (
                                            <Cell id={id} x={x} y={y} t={t} selectedLayer={selectedLayer} key={i} onCellClicked={onCellClicked} />
                                        );
                                    })
                                }
                                </div>
                            )
                        }) : null
                    }
                </div>
            </Draggable>
        </div>

    )
}

export default GridComponent;