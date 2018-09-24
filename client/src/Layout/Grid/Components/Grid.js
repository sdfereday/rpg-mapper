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

import { addTile, initTiles, updateTile } from "../../../Data/Actions/Actions";
import tstore from "../../../Data/Store/Store";

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
    tileDecorType,
    onTileDecorChanged
}) => {
    const options = Object.entries(TILE_DECOR_TYPES).map((a) => ({
        label: a[0],
        value: a[1]
    }));
    return (
        <ul>
            <li>ID: {id}</li>
            <li>Location: x:{x} | y:{y}</li>
            <li>Type: {t}</li>
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
                    onChange={onTileDecorChanged}
                />
            </li>
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

const GridComponent = ({
    mapWidth,
    mapHeight,
    mapGridPlane,
    mapEntityPlane,
    onionMode,
    selectedTileType,
    selectedLayer,
    selectedCellObject,
    toolMode,
    onChangeToolMode,
    onCellClicked,
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
                    <p>Tile Properties:</p>
                    <div className="well">
                        {selectedCellObject ?
                            <TileInfoContainer
                                {...selectedCellObject}
                                onDecorChanged={onTileDecorChanged}
                            /> : "No tile selected."
                        }
                    </div>
                </div>
            </div>
            <div id="map-inner">
                {layerData && layerData.length ?
                    layerData.map((layerGrid, layerIndex) => {
                        return (
                            <div className={layerIndex > 0 && onionMode ? 'layer onion' : 'layer'} key={layerIndex}>
                                {layerGrid.map(({ id, x, y, t }, i) => {
                                    return (
                                        <Cell
                                            isSelected={selectedCellObject && selectedCellObject.id === id}
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