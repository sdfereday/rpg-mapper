export const updateTile = ({ id, updatedTileType }) => ({
  type: "UPDATE_TILE",
  id,
  updatedTileType
});

export const initTiles = ({ tileData }) => ({
  type: "INIT_TILES",
  tileData
});

export const updateEntity = ({ id, updatedEntityType }) => ({
  type: "UPDATE_ENTITY",
  id,
  updatedEntityType
});

export const initEntities = ({ entityData }) => ({
  type: "INIT_ENTITIES",
  entityData
});