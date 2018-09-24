export default (state = [], action) => {
  if (typeof state === "undefined") {
    return [];
  }

  switch (action.type) {
    case "UPDATE_TILE":
      return state.map(tile => {
        return tile.id === action.id
          ? {
              ...tile,
              t: action.updatedTileType
            }
          : tile;
      });
    case "INIT_TILES":
      const data = action.tileData.map(t => ({
        ...t
      }));
      return [...data];
    default:
      return state;
  }
};
