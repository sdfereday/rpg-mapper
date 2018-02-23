export default DimensionsComponent = ({
    mapWidth,
    mapHeight,
    children,
    onMapDimensionsChanged,
    onMake
}) => {
    return [
        <LabeledComponent text="Width:">
            <Input
                id="mapWidth"
                value={mapWidth}
                onChange={onMapDimensionsChanged}
            />
        </LabeledComponent>,
        <LabeledComponent text="Height:">
            <Input
                id="mapHeight"
                value={mapHeight}
                onChange={onMapDimensionsChanged}
            />
        </LabeledComponent>,
        <Button onClick={onMake} text="make" />
    ]
}