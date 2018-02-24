import React from 'react';
import BoxComponent from '../Common/BoxComponent';
import TitleComponent from '../Common/TitleComponent';
import SidebarComponent from '../Layout/Sidebar/Components/Sidebar';
import DimensionsComponent from '../Layout/Sidebar/Components/Dimensions';
import LayersComponent from '../Layout/Sidebar/Components/Layers';
import TileTypesComponent from '../Layout/Sidebar/Components/TileTypes';
import ExportComponent from '../Layout/Sidebar/Components/Export';

const AppComponent = ({
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

export default AppComponent;