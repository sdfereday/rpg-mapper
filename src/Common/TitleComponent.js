export default TitleComponent = ({
    title,
    version
}) => {
    return (
        <p className="lead">
            {title}
            <span>v{version}</span>
        </p>
    )
}