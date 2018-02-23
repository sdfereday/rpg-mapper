export default TileTypesComponent = ({
    tileTypes,
    currentTileType,
    onTileTypeSelected
}) => {
    return (
        <div className="tileTypesList">
            {tileTypes && tileTypes.length &&
                tileTypes.map(({ type, name }, i) => {
                    return (
                        <TileTypeItemComponent
                            key={i}
                            name={name}
                            checked={currentTileType === type}
                            onChange={onTileTypeSelected}
                        />
                    );
                })
            }
        </div>
    )
}