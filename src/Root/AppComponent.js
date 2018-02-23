export default AppComponent = ({
    appTitle,
    version
}) => {
	return (
        <SidebarComponent id="ui">
            <TitleComponent
                title={appTitle}
                version={version}
            />
            <BoxComponent title="Map Information" intro="Fill in the required dimensions (in units):">
                <DimensionsComponent />
            </BoxComponent>
            <BoxComponent title="Layers">
                <LayersComponent />
            </BoxComponent>
            <BoxComponent title="Tile Types">
                <TileTypesComponent />
            </BoxComponent>
            <BoxComponent>
                <ExportComponent />
            </BoxComponent>
        </SidebarComponent>
    )
}