import React from 'react';
import Draggable from 'react-draggable';
import Cell from '../Components/Cell';

const GridComponent = ({
    mapWidth,
    mapHeight,
    mapGridPlane,
    selectedTileType,
    selectedLayer,
    onCellClicked
}) => {
    return (
        <div id="map">
            <Draggable
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[mapWidth, mapHeight]}
            >
                <div id="map-inner">
                    {mapGridPlane && mapGridPlane.length ?
                        mapGridPlane.map(({ id, x, y, t }, i) => {
                            return (
                                <Cell id={id} x={x} y={y} t={t} key={i} onCellClicked={onCellClicked} />
                            );
                        }) : <p>Please generate a base map to begin.</p>
                    }
                </div>
            </Draggable>
        </div>
      
    )
}

export default GridComponent;