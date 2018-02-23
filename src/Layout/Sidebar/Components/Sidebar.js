export default SidebarComponent = ({
    id,
    children
}) => {
    return (
        <div id={id}>
            {children}
        </div>
    )
}