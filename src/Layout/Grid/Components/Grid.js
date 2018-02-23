export default GridComponent = ({
    cellData,
    selectedTileType,
    selectedLayer,
    onCellClicked
}) => {
    return (
        <div className="map">
            {cellData && cellData.length &&
                cellData.map(({ x, y, id }, i) => {
                    return (
                        <CellComponent
                            key={i}
                            selectedTileType={selectedTileType}
                            selectedLayer={selectedLayer}
                            tileScale={MAP_OPTIONS.TILE_SCALE}
                            onCellClicked={onCellClicked}
                            x={x}
                            y={y}
                            id={id}
                        />
                    );
                })
            }
        </div>
    )
}