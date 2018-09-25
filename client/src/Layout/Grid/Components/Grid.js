import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import Draggable from 'react-draggable';
import Cell from '../Components/Cell';
import Radio from '../../../Common/Radio';
import LabeledComponent from '../../../Common/LabeledComponent';
import ReactSelect from 'react-select';
import { TOOL_TYPES, TILE_DECOR_TYPES, SELECT, PAINT } from '../../../Consts/EditorConstants';

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
    mapType
}) => {
    return (
        <ul>
            <li>ID: {id}</li>
            <li>Location: x:{x} | y:{y}</li>
            <li>Cell Type: {t}</li>
            <li>Map Type: {mapType === 0 ? 'Tile' : 'Entity'}</li>
        </ul>
    )
}

const TileOptions = ({
    id,
    tileDecorType,
    onChange
}) => {
    const options = Object.entries(TILE_DECOR_TYPES).map((a) => ({
        label: a[0],
        value: a[1]
    }));
    return (
        <div>
            <p>Options:</p>
            <ul>
                <li>Decor Type:
                    <ReactSelect
                        id={id}
                        value={options.find(({ value }) => value === tileDecorType )}
                        options={options}
                        clearable={false}
                        autosize={false}
                        styles={{option: (base, state) => ({
                            ...base,
                            color: '#333'
                        })}}
                        onChange={onChange}
                    />
                </li>
            </ul>
        </div>
    )
}

const TileOptionsContainer = compose(
    withHandlers({
        onChange: ({ id, onChange }) => ({ value }) => onChange({ id, tileDecorType: value })
    })
)(TileOptions);

const CellComponent = ({
    isSelected = false,
    isDisabled,
    layerIndex,
    onClicked,
    ...props
}) => {
    return (
        <Cell
            {...props}
            isSelected={isSelected}
            isDisabled={isDisabled}
            layer={layerIndex}
            onClicked={onClicked}
        />
    )
}

const GridComponent = ({
    mapGridPlane,
    mapEntityPlane,
    onionMode,
    selectedLayer,
    selectedTileId,
    toolMode,
    onChangeToolMode,
    onCellClicked,
    onEntityDataChanged
}) => {
    const layerData = [mapGridPlane, mapEntityPlane];
    const selectedCellObject = layerData[selectedLayer]
        .find(d => d.id === selectedTileId);

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
                    <div className="well">
                        {selectedCellObject ?
                            <TileInfo
                                {...selectedCellObject}
                            /> : "No tile selected."
                        }
                    </div>
                    {selectedLayer === 1 && selectedCellObject &&
                        <div className="well">
                            <TileOptionsContainer
                                {...selectedCellObject}
                                onChange={onEntityDataChanged}
                            />
                        </div>
                    }
                </div>
            </div>
            <div id="map-inner">
                <div className={selectedLayer > 0 && onionMode ? 'layer onion' : 'layer'}>
                {layerData && layerData.length ?
                    layerData[selectedLayer].map(cellData => {
                        return (
                            <CellComponent
                                key={cellData.id}
                                isSelected={selectedCellObject && selectedTileId === cellData.id}
                                layerIndex={selectedLayer}
                                {...cellData}
                                isDisabled={cellData.isDisabled}
                                onClicked={onCellClicked}
                            />
                        )
                    }) : null
                }
                </div>
            </div>
        </div>
    )
}

export default GridComponent;