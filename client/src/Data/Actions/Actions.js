export const updateTile = ({ id, updatedTileType }) => ({
  type: "UPDATE_TILE",
  id,
  updatedTileType
});

export const initTiles = ({ tileData }) => ({
  type: "INIT_TILES",
  tileData
});

export const updateEntity = ({ id, updateProps }) => ({
  type: "UPDATE_ENTITY",
  id,
  updateProps
});

export const setEntityDisabled = ({ x, y, isDisabled }) => ({
  type: "SET_ENTITY_DISABLED",
  x, y, isDisabled
});

export const initEntities = ({ entityData }) => ({
  type: "INIT_ENTITIES",
  entityData
});