export const updateTile = ({ id, updatedTileType }) => ({
  type: "UPDATE_TILE",
  id,
  updatedTileType
});

export const initTiles = ({ tileData }) => ({
  type: "INIT_TILES",
  tileData
})