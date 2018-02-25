import React from 'react';
import BoxComponent from '../../Common/BoxComponent';
import TitleComponent from '../../Common/TitleComponent';
import SidebarComponent from '../../Layout/Sidebar/Components/Sidebar';
import Dimensions from '../../Layout/Sidebar/Containers/Dimensions';
import GenerateComponent from '../../Layout/Sidebar/Containers/Generate';
import LayersComponent from '../../Layout/Sidebar/Containers/Layers';
import TileTypesComponent from '../../Layout/Sidebar/Containers/TileTypes';
import TileLinksComponent from '../../Layout/Sidebar/Containers/TileLinks';
import ExportComponent from '../../Layout/Sidebar/Containers/Export';
import Grid from '../../Layout/Grid/Containers/Grid';

const AppComponent = ({
    appTitle,
    version,
    ...props
}) => {
	return [
        <SidebarComponent id="ui" key="ui">
            <TitleComponent
                title={appTitle}
                version={version}
            />
            <BoxComponent title="Map Information" intro="Fill in the required dimensions (in units):">
                <Dimensions {...props} />
            </BoxComponent>
            <BoxComponent title="Apply ROT Fill" intro="Use ROT.js to fill perform a tile placement:">
                <GenerateComponent {...props} />
            </BoxComponent>
            <BoxComponent title="Layers">
                <LayersComponent {...props} />
            </BoxComponent>
            <BoxComponent title="Tile Types">
                <TileTypesComponent {...props} />
            </BoxComponent>
            <BoxComponent title="Tile Links" intro="Required linked tiles that each exit will require to unlock:">
                <TileLinksComponent {...props} />
            </BoxComponent>
            <BoxComponent title="Export To JSON">
                <ExportComponent {...props} />
            </BoxComponent>
        </SidebarComponent>,
        <Grid {...props} key="grid" />
    ]
}

export default AppComponent;