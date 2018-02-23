export default LayersComponent = ({
    layers,
    selectedLayer,
    onionMode,
    onOnionSelected,
    onLayerSelected
}) => {
    return [
        <Checkbox
            id="onion-mode"
            label="Onion"
            checked={onionMode}
            onChange={onOnionSelected}
        />,
        <div className="layersList">
            {layers && layers.length &&
                layers.map((layer, i) => {
                    return (
                        <LayerItemComponent
                            name="layer"
                            index={i}
                            selectedLayer={selectedLayer}
                            onLayerSelected={onLayerSelected}
                        />
                    );
                })
            }
        </div>
    ]
}