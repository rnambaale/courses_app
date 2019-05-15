import courseReducer from "../../../redux/reducers/courseReducer";
import * as courseActions from "../../../redux/actions/courseActions";

describe("course reducer", () => {
  it("should add a course when passed the CREATE_COURSE_SUCCESS action type", () => {
    // arrange
    const initialState = [{ title: "A" }, { title: "B" }, { title: "C" }];

    const newCourse = { title: "D" };

    const action = courseActions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert

    expect(newState.length).toEqual(4);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
    expect(newState[3].title).toEqual("D");
  });

  it("should update a course when passed the UPDATE_COURSE_SUCCESS action type", () => {
    // arrange
    const initialState = [
      { id: 1, title: "A" },
      { id: 2, title: "B" },
      { id: 3, title: "C" }
    ];

    const course = { id: 2, title: "New Title" };

    const action = courseActions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);

    // assert

    const updatedCourse = newState.find(a => course.id === a.id);
    const unTouchedCourse = newState.find(a => a.id === 1);

    expect(newState.length).toEqual(3);
    expect(updatedCourse.title).toEqual("New Title");
    expect(unTouchedCourse.title).toEqual("A");
  });
});
