import * as actionTypes from "./../actionTypes";

export function apiCallBegin() {
  return { type: actionTypes.API_CALL_BEGIN };
}

export function apiCallError() {
  return { type: actionTypes.API_CALL_ERROR };
}
