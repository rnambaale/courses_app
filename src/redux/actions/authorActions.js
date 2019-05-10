import * as actionTypes from "./../actionTypes";
import * as authorApi from "./../../api/authorApi";
import * as apiStatusActions from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => {
    dispatch(apiStatusActions.apiCallBegin());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(err => {
        dispatch(apiStatusActions.apiCallError(err));
        throw err;
      });
  };
}
