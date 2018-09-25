import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import Grid from "../Components/Grid";
import { TOOL_TYPES, TILE_TYPES } from "../../../Consts/EditorConstants";

import { connect } from "react-redux";
import { updateTile, updateEntity, setEntityDisabled } from "../../../Data/Actions/Actions";

// I'd suggest using redux to handle this tile stuff, rather than having state everywhere.
const GridWrapper = compose(
  withHandlers({
    onChangeToolMode: ({ onChangeToolMode }) => value =>
      onChangeToolMode(value),

    onEntityDataChanged: ({ dispatch }) => data => {
      dispatch(
        updateEntity({
          id: data.id,
          updateProps: {
            tileDecorType: data.tileDecorType
          }
        })
      );
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
        onEntitySelected(entityData.id);
        return;
      }

      dispatch(
        updateEntity({
          id: entityData.id,
          updateProps: {
            updatedEntityType: selectedTileType
          }
        })
      );
    },

    onTileClicked: ({
      dispatch,
      toolMode,
      selectedLayer,
      selectedTileType,
      onCellSelected
    }) => tileData => {
      if (selectedLayer !== 0) return;

      if (toolMode === TOOL_TYPES.SELECT) {
        onCellSelected(tileData.id);
        return;
      }

      dispatch(
        updateTile({
          ...tileData,
          updatedTileType: selectedTileType
        })
      );

      dispatch(
        setEntityDisabled({
          x: tileData.x,
          y: tileData.y,
          isDisabled: selectedTileType !== TILE_TYPES.FLOOR_TILE
        })
      )
    }
  }),
  withHandlers({
    onCellClicked: ({
      selectedLayer,
      onTileClicked,
      onEntityClicked
    }) => data => {
      if (selectedLayer === 0) {
        onTileClicked(data);
      } else {
        onEntityClicked(data);
      }
    }
  })
)(Grid);

export default connect()(GridWrapper);
