import { createStore, applyMiddleware } from "redux";
import tileReducer from "../../Data/Reducers/TileReducer";

const onStoreUpdate = ({ subscriber }) => ({ getState }) => {
  return next => action => {
    //console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    //console.log("state after dispatch", getState());

    if (subscriber) {
      subscriber(getState());
    }

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
};

const createTileStore = (reducer, middlware) =>
  middlware
    ? createStore(reducer, applyMiddleware(middlware))
    : createStore(reducer);

export default createTileStore(tileReducer);
