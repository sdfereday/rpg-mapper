import React from "react";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import withState from "recompose/withState";

import {
  TILE_MAPPINGS,
  TILE_SCALE,
  TILE_TYPES,
  TILE_DECOR_TYPES
} from "../../../Consts/EditorConstants.js";

const getAssetUrlByType = t => {
  const { asset } = TILE_MAPPINGS.find(({ type }) => type === t);
  return asset ? asset : null;
};

const CellComponent = ({
  isSelected,
  id,
  x,
  y,
  t,
  layer,
  onClicked
}) => {
  const tileX = x * TILE_SCALE + "px";
  const tileY = y * TILE_SCALE + "px";

  const cellStyle = {
    top: tileY,
    left: tileX,
    backgroundColor: isSelected ? "#ccc" : "",
    backgroundUrl: getAssetUrlByType(t)
  };

  const className =
    t !== TILE_TYPES.FLOOR_TILE && t !== TILE_TYPES.EMPTY
      ? "sq occupied"
      : "sq";

  return (
    <div
      id={id}
      t={t}
      x={x}
      y={y}
      layer={layer}
      className={className}
      style={cellStyle}
      onClick={onClicked}
    >
      {t}
    </div>
  );
};

export default compose(
  withHandlers({
    onClicked: ({ onClicked, isDisabled, ...props }) => () =>
      isDisabled ? null : onClicked(props)
  })
)(CellComponent);
