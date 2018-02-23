export default ListComponent = ({
    collection,
    component,
    ...props
}) => {
    // There's a better way to do this I'm sure.
    const Component = component;
    return (
        <ul>
            {collection && collection.length &&
                collection.map((item, i) => {
                    return (
                        <li>
                            <Component {...item} key={i} />
                        </li>
                    );
                })
            }
        </ul>
    )
}