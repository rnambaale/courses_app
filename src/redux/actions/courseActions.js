import * as actionTypes from "./../actionTypes";
import * as courseApi from "./../../api/courseApi";
import * as apiStatusActions from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course };
}

// thunks

export function loadCourses() {
  return dispatch => {
    dispatch(apiStatusActions.apiCallBegin());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(err => {
        dispatch(apiStatusActions.apiCallError(err));
        throw err;
      });
  };
}

export function saveCourse(course) {
  /* eslint-disable no-unused-vars */
  return (dispatch, getState) => {
    dispatch(apiStatusActions.apiCallBegin());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(err => {
        dispatch(apiStatusActions.apiCallError(err));
        throw err;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
