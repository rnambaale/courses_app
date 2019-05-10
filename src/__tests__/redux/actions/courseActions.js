import * as courseActions from "../../../redux/actions/courseActions";
import * as actionTypes from "../../../redux/actionTypes";
import { courses } from "../../../../tools/mockData";

import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Course async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Course Thunk", () => {
    it("should create a BEGIN_API_CALL and LOAD_COURSE_SUCCESS when loading course", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: actionTypes.API_CALL_BEGIN },
        { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("Course Action creators", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: actionTypes.CREATE_COURSE_SUCCESS,
      course
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
