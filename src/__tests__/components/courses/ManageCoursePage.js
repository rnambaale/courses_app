import React from "react";
import { ManageCoursePage } from "../../../components/courses/ManageCoursePage";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../../tools/mockData";

function renderManageCoursePage(args) {
  const defaultProps = {
    loadCourses: () => {},
    loadAuthors: () => {},
    saveCourse: () => {},
    courses,
    authors,
    course: newCourse,
    history: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

describe("Manage Course Page Tests", () => {
  it("displays validation error for saving a course without a title", () => {
    const wrapper = renderManageCoursePage();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toEqual("Title is required.");
  });
});
