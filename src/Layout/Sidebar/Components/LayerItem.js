export default LayerItemComponent = ({
    name,
    index,
    selectedLayer,
    onLayerSelected
}) => {
    return (
        <Checkbox
            id={name + index}
            label={name}
            checked={index === selectedLayer}
            onChange={onLayerSelected}
        />
    )
}