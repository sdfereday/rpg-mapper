export default LabeledComponent = ({
    text,
    children,
}) => {
    return (
        <div className="node">
            {text}
            {children}
        </div>
    )
};