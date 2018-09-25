import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import { connect } from "react-redux";
import App from "../Component/App";

import {
  TILE_TYPES,
  TOOL_TYPES
} from "../../Consts/EditorConstants.js";

const AppWrapper = compose(
  withState("mapWidth", "setMapWidth", 15),
  withState("mapHeight", "setMapHeight", 15),
  withState("exitRequirements", "setExitRequirements", []),
  withState("selectedLayer", "setSelectedLayer", 0),
  withState("selectedTileType", "setSelectedTileType", TILE_TYPES.EMPTY),
  withState("selectedTileId", "setSelectedTileId", ""),
  withState("toolMode", "setToolMode", TOOL_TYPES.SELECT),
  withState("onionMode", "setOnionMode", true),
  withHandlers({
    onOnionSelected: ({ setOnionMode, onionMode }) => () =>
      setOnionMode(!onionMode),

    onCellSelected: ({ setSelectedTileId }) => id =>
      setSelectedTileId(id),

    onEntitySelected: ({ setSelectedTileId }) => id =>
      setSelectedTileId(id),

    onLayerSelected: ({
      setSelectedLayer,
      setSelectedTileId
    }) => layer => {
      setSelectedLayer(layer);
      setSelectedTileId(null);
    },

    onChangeToolMode: ({ setToolMode }) => mode => setToolMode(mode)
  })
)(App);

const mapStateToProps = ({ tileReducer, entityReducer }) => ({
  mapGridPlane: tileReducer.map(cell => ({
    ...cell
  })),
  mapEntityPlane: entityReducer.map(entity => ({
    ...entity
  }))
});

export default connect(mapStateToProps)(AppWrapper);
