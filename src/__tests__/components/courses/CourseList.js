import React from "react";
import CourseList from "../../../components/courses/CourseList";
import { shallow } from "enzyme";
import { courses } from "../../../../tools/mockData";

function renderCourseList(args) {
  const defaultProps = {
    courses,
    onDeleteClick: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseList {...props} />);
}

describe("Course List Tests", () => {
  it("renders the course list table", () => {
    const wrapper = renderCourseList();
    expect(wrapper.find("table").length).toBe(1);
  });
});
