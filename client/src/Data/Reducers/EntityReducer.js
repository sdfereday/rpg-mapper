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
              t: action.updatedEntityType
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
