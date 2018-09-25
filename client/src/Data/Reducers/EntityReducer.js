export default (state = [], action) => {
  if (typeof state === "undefined") {
    return [];
  }

  switch (action.type) {
    case "UPDATE_ENTITY":
      return state.map(entity => {
        return entity.id === action.id
          ? {
              ...entity,
              ...action.updateProps
            }
          : entity;
      });
    case "SET_ENTITY_DISABLED":
      return state.map(entity => {
        return entity.x === action.x && entity.y === action.y
          ? {
              ...entity,
              isDisabled: action.isDisabled
            }
          : entity;
      });
    case "INIT_ENTITIES":
      const data = action.entityData.map(t => ({
        ...t
      }));
      return [...data];
    default:
      return state;
  }
};
