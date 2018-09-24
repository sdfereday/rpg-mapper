import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import App from "../Component/App";

import { initTiles } from "../../Data/Actions/Actions";

import {
  TILE_TYPES,
  TOOL_TYPES,
  SELECT
} from "../../Consts/EditorConstants.js";

export default compose(
  withState("mapWidth", "setMapWidth", 15),
  withState("mapHeight", "setMapHeight", 15),
  withState("mapGridPlane", "setMapGridPlane", []),
  withState("mapEntityPlane", "setMapEntityPlane", []),
  withState("exitRequirements", "setExitRequirements", []),
  withState("selectedLayer", "setSelectedLayer", 0),
  withState("selectedTileType", "setSelectedTileType", TILE_TYPES.EMPTY),
  withState("selectedCellObject", "setSelectedCellObject", null),
  withState("toolMode", "setToolMode", TOOL_TYPES.SELECT),
  withState("onionMode", "setOnionMode", true),
  withHandlers({
    onMapGridPlane: ({ setMapGridPlane, selectedLayer }) => gridData => {
      if (selectedLayer === 0) {
        // dispatch(
        //     initTiles({ tileData: gridData })
        // );
      }
    },
    onUpdateGrid: ({
      selectedLayer,
      setMapGridPlane,
      setMapEntityPlane
    }) => gridData => {
        console.log(gridData);
    //   if (selectedLayer === 0) {
    //     setMapGridPlane(gridData);
    //   } else {
    //     setMapEntityPlane(gridData);
    //   }
    },
    onOnionSelected: ({ setOnionMode, onionMode }) => () => {
      setOnionMode(!onionMode);
    },

    onCellSelected: ({ setSelectedCellObject }) => cell =>
      setSelectedCellObject(cell),

    onChangeToolMode: ({ setToolMode }) => mode => setToolMode(mode)
  })
)(App);
