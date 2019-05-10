import * as actionTypes from "./../actionTypes";
import initalSate from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initalSate.apiCallsInProgress,
  action
) {
  if (action.type === actionTypes.API_CALL_BEGIN) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type === actionTypes.API_CALL_ERROR
  ) {
    return state - 1;
  } else {
    return state;
  }
}
