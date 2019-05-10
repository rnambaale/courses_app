import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as courseActions from "./../../redux/actions/courseActions";
import * as authorActions from "./../../redux/actions/authorActions";
import CourseList from "./CourseList";
import Spinner from "./../common/Spinner";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { loadCourses, loadAuthors, courses, authors } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = course => {
    const { deleteCourse } = this.props;
    toast.success("Course Deleted");
    deleteCourse(course).catch(error => {
      toast.error("Course Delete failed " + error.message, {
        autoClose: false
      });
    });
  };

  render() {
    const { redirectToAddCoursePage } = this.state;
    const { courses, loading } = this.props;
    return (
      <>
        {redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBotton: 20 }}
              className="btn btn-primary add-course"
              onClick={() => {
                this.setState({ redirectToAddCoursePage: true });
              }}
            >
              Add Course
            </button>
            {/* <Link className="btn btn-primary add-course" to="/course">
              Add Course
            </Link> */}
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  deleteCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { authors, courses, apiCallsInProgress } = state;
  return {
    courses:
      authors.length === 0
        ? []
        : courses.map(course => {
            return {
              ...course,
              authorName: authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: authors,
    loading: apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  deleteCourse: courseActions.deleteCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
