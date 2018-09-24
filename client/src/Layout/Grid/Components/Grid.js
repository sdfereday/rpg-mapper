import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import Draggable from 'react-draggable';
import Cell from '../Components/Cell';
import Radio from '../../../Common/Radio';
import LabeledComponent from '../../../Common/LabeledComponent';
import ReactSelect from 'react-select';
import { TOOL_TYPES, TILE_DECOR_TYPES, SELECT, PAINT } from '../../../Consts/EditorConstants';
import { withState } from 'recompose';

const RadioContainer = compose(
    withHandlers({
        onChange: ({ onChange, value }) => () =>
            onChange(value)
    })
)(Radio);

const TileInfo = ({
    id,
    x,
    y,
    t,
    mapType,
    tileDecorType,
    selectedLayer,
    onEntityDataChanged
}) => {
    const options = Object.entries(TILE_DECOR_TYPES).map((a) => ({
        label: a[0],
        value: a[1]
    }));
    return (
        <ul>
            <li>ID: {id}</li>
            <li>Location: x:{x} | y:{y}</li>
            <li>Cell Type: {t}</li>
            <li>Map Type: {mapType === 0 ? 'Tile' : 'Entity'}</li>
            {mapType === 1 &&
                <li>Decor Type:
                    <ReactSelect
                        value={options.find(({ value }) => value === tileDecorType )}
                        options={options}
                        clearable={false}
                        autosize={false}
                        styles={{option: (base, state) => ({
                            ...base,
                            color: '#333'
                        })}}
                        onChange={onEntityDataChanged}
                    />
                </li>
            }
        </ul>
    )
}

const TileInfoContainer = compose(
    // This isn't quite right, let's move it to redux.
    withState('tileDecorType', 'setTileDecorType', TILE_DECOR_TYPES.NONE),
    withHandlers({
        onTileDecorChanged: ({ setTileDecorType, id, onDecorChanged }) => ({ value }) =>
        {
            setTileDecorType(value);
            onDecorChanged({
                id,
                tileDecorType: value
            });
        }
    })
)(TileInfo);

const CellComponent = ({
    isSelected,
    id,
    x,
    y,
    t,
    mapType,
    layerIndex,
    onClicked
}) => {
    return (
        <Cell
            isSelected={isSelected}
            id={id}
            x={x}
            y={y}
            t={t}
            mapType={mapType}
            layer={layerIndex}
            onClicked={onClicked}
        />
    )
}

const CellWrapper = compose(
)(CellComponent);

const EntityWrapper = compose(
)(CellComponent);

const GridComponent = ({
    mapGridPlane,
    mapEntityPlane,
    onionMode,
    selectedLayer,
    selectedCellObject,
    toolMode,
    onChangeToolMode,
    onCellClicked,
    onEntityClicked,
    onTileDecorChanged
}) => {
    const layerData = [mapGridPlane, mapEntityPlane];
    return (
        <div id="map">
            <div className="tools">
                <div className="mode">
                    <p><strong>Tools</strong></p>
                    <LabeledComponent text="Generation Mode:" key="use-rot">
                    <RadioContainer
                        id={SELECT}
                        name="Select Mode"
                        value={TOOL_TYPES.SELECT}
                        checked={toolMode === TOOL_TYPES.SELECT}
                        onChange={onChangeToolMode}
                    />
                   <RadioContainer
                        id={PAINT}
                        name="Paint Mode"
                        value={TOOL_TYPES.PAINT}
                        checked={toolMode === TOOL_TYPES.PAINT}
                        onChange={onChangeToolMode}
                    />
                    </LabeledComponent>
                </div>
                <div className="tile-properties">
                    <p>Properties:</p>
                    <div className="well">
                        {selectedCellObject ?
                            <TileInfoContainer
                                {...selectedCellObject}
                                selectedLayer={selectedLayer}
                                onDecorChanged={onTileDecorChanged}
                            /> : "No tile selected."
                        }
                    </div>
                </div>
            </div>
            <div id="map-inner">
                <div className={selectedLayer > 0 && onionMode ? 'layer onion' : 'layer'}>
                {layerData && layerData.length ?
                layerData[selectedLayer].map(cellData => {
                        return (
                            <CellComponent
                                key={cellData.id}
                                isSelected={selectedCellObject && selectedCellObject.id === cellData.id}
                                layerIndex={selectedLayer}
                                {...cellData}
                                onClicked={selectedLayer === 0 ? onCellClicked : onEntityClicked}
                            />
                        )
                    }) : null
                }
                </div>
            </div>
        </div>
    )
}

// layerData.map((layerGrid, layerIndex) => {
//     return (
//         <div className={layerIndex > 0 && onionMode ? 'layer onion' : 'layer'} key={layerIndex}>
//             {layerGrid.map((cellData) => {
//                 console.log("Redraw.");
//                 return (
//                     <CellComponent
//                         key={cellData.id}
//                         isSelected={selectedCellObject && selectedCellObject.id === cellData.id}
//                         layerIndex={layerIndex}
//                         {...cellData}
//                         onClicked={layerIndex === 0 ? onCellClicked : onEntityClicked}
//                     />
//                 );
//             })
//         }
//         </div>
//     )
// }) : null

export default GridComponent;