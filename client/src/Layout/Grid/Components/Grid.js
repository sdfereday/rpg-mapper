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
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[mapWidth, mapHeight]}
            >
                <div id="map-inner">
                    {mapGridPlane && mapGridPlane.length &&
                        mapGridPlane.map(({ x, y, t }, i) => {
                            return (
                                <Cell x={x} y={y} t={t} key={i} onCellClicked={onCellClicked} />
                            );
                        })
                    }
                </div>
            </Draggable>
        </div>
      
    )
}

export default GridComponent;