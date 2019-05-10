import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as courseActions from "./../../redux/actions/courseActions";
import * as authorActions from "./../../redux/actions/authorActions";
import PropTypes from "prop-types";

import CourseForm from "./CourseForm";
import Spinner from "./../common/Spinner";
import { newCourse } from "./../../../tools/mockData";

export function ManageCoursePage({
  loadCourses,
  loadAuthors,
  saveCourse,
  courses,
  authors,
  course: initialCourse,
  history
}) {
  //useState returns two values and we use array destructuring to assign each value a name
  // it takes in the initalised value of the state as parameters
  // the function declaration above has `initialCourse` as an alias of props.course to avaoid the conflict with our state name
  const [course, setCourse] = useState(initialCourse);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // useEffect hook allows us to manage side effects. this example does exactly what componentdidMount would do
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...initialCourse });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [initialCourse]);

  function handleChange(event) {
    const { value, name } = event.target;
    //this.setState({[name] : value})

    // setCourse(prevState => {
    //   return { ...prevState, [name]: value };
    // });

    setCourse(prevState => {
      return {
        ...prevState,
        [name]: name === "authorId" ? parseInt(value, 10) : value
      };
    });
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  //course , and errors are plain react state variables
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const { authors, courses } = state;
  const slug = ownProps.match.params.slug;
  const course =
    slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse;
  return {
    course,
    courses,
    authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
