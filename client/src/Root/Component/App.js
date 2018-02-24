import React from 'react';
import BoxComponent from '../../Common/BoxComponent';
import TitleComponent from '../../Common/TitleComponent';
import SidebarComponent from '../../Layout/Sidebar/Components/Sidebar';
import Dimensions from '../../Layout/Sidebar/Containers/Dimensions';
import LayersComponent from '../../Layout/Sidebar/Components/Layers';
import TileTypesComponent from '../../Layout/Sidebar/Components/TileTypes';
import ExportComponent from '../../Layout/Sidebar/Components/Export';

const AppComponent = ({
    appTitle,
    version,
    ...props
}) => {
	return (
        <SidebarComponent id="ui">
            <TitleComponent
                title={appTitle}
                version={version}
            />
            <BoxComponent title="Map Information" intro="Fill in the required dimensions (in units):">
                <Dimensions {...props} />
            </BoxComponent>
            <BoxComponent title="Layers">
                <LayersComponent {...props} />
            </BoxComponent>
            <BoxComponent title="Tile Types">
                <TileTypesComponent {...props} />
            </BoxComponent>
            <BoxComponent>
                <ExportComponent {...props} />
            </BoxComponent>
        </SidebarComponent>
    )
}

export default AppComponent;