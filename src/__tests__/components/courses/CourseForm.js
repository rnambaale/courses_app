import React from "react";
import CourseForm from "../../../components/courses/CourseForm";
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

describe("course from tests", () => {
  it("renders form and heading", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Add Course");
  });

  it("labels save button as `save` when not saving", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("button").text()).toEqual("Save");
  });

  it("labels save button as `saving...` when saving", () => {
    const wrapper = renderCourseForm({ saving: true });
    //console.log(wrapper.debug());
    expect(wrapper.find("button").text()).toEqual("Saving...");
  });
});
