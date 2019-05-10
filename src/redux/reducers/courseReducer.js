import * as actionTypes from "./../actionTypes";
import initalSate from "./initialState";

export default function courseReducer(state = initalSate.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;

    case actionTypes.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];

    case actionTypes.UPDATE_COURSE_SUCCESS:
      return state.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        } else {
          return course;
        }
      });
    case actionTypes.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);

    default:
      return state;
  }
}
