export default TileTypeItemComponent = ({
    id,
    name,
    isChecked,
    onChange
}) => {
    return (
        <Radio
            id={id}
            value={id}
            name={name}
            checked={isChecked}
            onChange={onChange}
        />
    )
}