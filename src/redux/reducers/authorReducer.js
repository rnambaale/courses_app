import * as actionTypes from "./../actionTypes";
import initalSate from "./initialState";

export default function authorReducer(state = initalSate.authors, action) {
  switch (action.type) {
    case actionTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
