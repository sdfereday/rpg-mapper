import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import uniqueId from "lodash/uniqueId";
import Grid from "../Components/Grid";
import { TILE_TYPES, TOOL_TYPES } from "../../../Consts/EditorConstants";

import { connect } from "react-redux";
import { updateTile } from "../../../Data/Actions/Actions";

// I'd suggest using redux to handle this tile stuff, rather than having state everywhere.
const GridWrapper = compose(
  withHandlers({
    onTileDecorChanged: () => data => {
      console.log(data);
    },

    onChangeToolMode: ({ onChangeToolMode }) => value =>
      onChangeToolMode(value),

    onCellClicked: ({
      dispatch,
      onCellSelected,
      selectedTileType,
      selectedLayer,
      toolMode,
      mapGridPlane,
      mapEntityPlane,
      onUpdateGrid
    }) => tileData => {
      // const gridData =
      //   selectedLayer === 0
      //     ? [].concat(mapGridPlane)
      //     : [].concat(mapEntityPlane);

      if (toolMode === TOOL_TYPES.SELECT) {
        onCellSelected(tileData);
        return;
      }

      // if (mapGridPlane.length === 0) {
      //   console.error("Map grid plane should be generated before continuing.");
      //   return;
      // }

      dispatch(
        updateTile({
          ...tileData,
          updatedTileType: selectedTileType
        })
      );

      // if (gridData.length === 0 || !tileData) {
      //   const tileProps = mapGridPlane.find(tile => tile.id === targetId);
      //   gridData.push({
      //     id: uniqueId(),
      //     ...tileProps,
      //     selectedLayer,
      //     t: selectedTileType
      //   });

      //   if (selectedLayer !== 0) {
      //     onUpdateGrid(gridData.filter(x => x.t !== TILE_TYPES.EMPTY));
      //   } else {
      //     onUpdateGrid(gridData);
      //   }
      //   return;
      // }

      // Note to self: This isn't very optmised, could use quad-trees or something.
      // const updatedGrid = gridData.map(tile => {
      //   const { id, ...tileProps } = tile;
      //   return id === targetId
      //     ? {
      //         id,
      //         ...tileProps,
      //         selectedLayer,
      //         t: selectedTileType
      //       }
      //     : tile;
      // });

      // Ensure that empties are removed if not the ground layer (needs a little work this bit)
      // TODO: use consts please for layers, perhaps make them more dynamic too.
      // if (selectedLayer !== 0) {
      //   onUpdateGrid(updatedGrid.filter(x => x.t !== TILE_TYPES.EMPTY));
      // } else {
      //   onUpdateGrid(updatedGrid);
      // }
    }
  })
)(Grid);

const mapStateToProps = state => ({
  mapGridPlane: state.map(x => ({ id: uniqueId(), ...x }))
});

export default connect(mapStateToProps)(GridWrapper);
