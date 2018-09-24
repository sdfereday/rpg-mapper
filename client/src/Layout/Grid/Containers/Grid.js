import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import uniqueId from "lodash/uniqueId";
import Grid from "../Components/Grid";
import { TILE_TYPES, TOOL_TYPES } from "../../../Consts/EditorConstants";

import { connect } from "react-redux";
import { updateTile, updateEntity } from "../../../Data/Actions/Actions";

// I'd suggest using redux to handle this tile stuff, rather than having state everywhere.
const GridWrapper = compose(
  withHandlers({
    onChangeToolMode: ({ onChangeToolMode }) => value =>
      onChangeToolMode(value),

    onEntityDataChanged: ({ selectedLayer }) => data => {
      if (selectedLayer === 0) return;
      console.log(data);
    },

    onEntityClicked: ({
      dispatch,
      toolMode,
      selectedLayer,
      selectedTileType,
      onEntitySelected
    }) => entityData => {
      if (selectedLayer !== 1) return;

      if (toolMode === TOOL_TYPES.SELECT) {
        onEntitySelected(entityData);
        return;
      }

      dispatch(
        updateEntity({
          ...entityData,
          updatedEntityType: selectedTileType
        })
      );
    },

    onCellClicked: ({
      dispatch,
      toolMode,
      selectedLayer,
      selectedTileType,
      onCellSelected
    }) => tileData => {
      if (selectedLayer !== 0) return;

      if (toolMode === TOOL_TYPES.SELECT) {
        onCellSelected(tileData);
        return;
      }

      dispatch(
        updateTile({
          ...tileData,
          updatedTileType: selectedTileType
        })
      );
    }
  })
)(Grid);

const mapStateToProps = ({ tileReducer, entityReducer }) => ({
  mapGridPlane: tileReducer.map(cell => ({
    ...cell
  })),
  mapEntityPlane: entityReducer.map(entity => ({
    ...entity
  }))
});

export default connect(mapStateToProps)(GridWrapper);
