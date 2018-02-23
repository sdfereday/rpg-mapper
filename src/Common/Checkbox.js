export default Checkbox = ({
    id,
    label,
    checked,
    onChange
}) => {
    return (
        <div className="checkbox">
            <input type="checkbox" id={id} onChange={onChange} checked={checked} />
            <label htmlFor={id}></label>
            <span>{label}</span>
        </div>
    )
}