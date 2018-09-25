import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import withPropsOnChange from "recompose/withPropsOnChange";
import uniqueId from "lodash/uniqueId";
import Generate from "../Components/Generate";
import ROT from "../../../../../custom_libraries/rot.min.js";

import { createGrid, createGridAsBox } from "../../../utils/GridUtils";

import {
  BLANK,
  BOX,
  MAZE,
  CELLULAR,
  ROOM,
  GENERATOR_TYPES,
  TILE_TYPES
} from "../../../Consts/EditorConstants";

import { connect } from "react-redux";
import { initTiles, initEntities } from "../../../Data/Actions/Actions";

// TODO: Add ROT generators to utils also.
const GEN_MAP = {
  [BLANK]: {
    create(width, height) {
      return createGrid(width, height, TILE_TYPES.FLOOR_TILE);
    }
  },
  [BOX]: {
    create(width, height) {
      return createGridAsBox(
        width,
        height,
        TILE_TYPES.FLOOR_TILE,
        TILE_TYPES.WALL_TILE
      );
    }
  },
  [MAZE]: {
    create(width, height) {
      const cells = [];
      new ROT.Map.EllerMaze(width, height).create((x, y, t) =>
        cells.push({
          x,
          y,
          t:
            t === TILE_TYPES.EMPTY
              ? TILE_TYPES.FLOOR_TILE
              : TILE_TYPES.WALL_TILE
        })
      );
      return cells;
    }
  },
  [CELLULAR]: {
    create(width, height) {
      const cells = [];
      const iterations = 4;
      const map = new ROT.Map.Cellular(width, height);

      map.randomize(0.5);
      for (let i = 0; i < iterations; i++) {
        map.create((x, y, t) => {
          if (i >= iterations - 1) {
            cells.push({
              x,
              y,
              t:
                t === TILE_TYPES.EMPTY
                  ? TILE_TYPES.WALL_TILE
                  : TILE_TYPES.FLOOR_TILE
            });
          }
        });
      }

      return cells;
    }
  },
  [ROOM]: {
    create(width, height) {
      const cells = [];
      new ROT.Map.Digger(width, height).create((x, y, t) =>
        cells.push({
          x,
          y,
          t:
            t === TILE_TYPES.EMPTY
              ? TILE_TYPES.FLOOR_TILE
              : TILE_TYPES.WALL_TILE
        })
      );
      return cells;
    }
  }
};

const GenerateWrapper = compose(
  withState("currentMode", "setCurrentMode", GENERATOR_TYPES.BLANK),
  withState("invalidValues", "setInvalidValues", true),
  withPropsOnChange(
    ["mapWidth", "mapHeight"],
    ({ mapWidth, mapHeight, setInvalidValues }) =>
      setInvalidValues(mapWidth === 0 || mapHeight === 0)
  ),
  withHandlers({
    onChangeCurrentMode: ({ setCurrentMode }) => ({ target }) => {
      setCurrentMode(target.id);
    },
    onGenerate: ({ dispatch, currentMode, mapWidth, mapHeight }) => () => {
      if (currentMode === ROOM && (mapWidth < 24 || mapHeight < 24)) {
        console.error(
          "Setting less than 24 units in room mode may generate errors. Aborting."
        );
        return;
      }

      const baseLayer = GEN_MAP[currentMode]
        .create(mapWidth, mapHeight)
        .map(tile => ({
          ...tile,
          id: uniqueId(),
          mapType: 0,
          selectedLayer: 0
        }));

      dispatch(initTiles({ tileData: baseLayer }));

      const entityLayer = baseLayer.map(tile => ({
        ...tile,
        id: uniqueId(),
        selectedLayer: 1,
        mapType: 1,
        tileDecorType: 0,
        t: tile.t === TILE_TYPES.FLOOR_TILE ? TILE_TYPES.EMPTY : tile.t,
        isDisabled: tile.t !== TILE_TYPES.FLOOR_TILE
      }));

      dispatch(initEntities({ entityData: entityLayer }));
    }
  })
)(Generate);

export default connect()(GenerateWrapper);
