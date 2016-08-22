import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'
import {browserHistory, Link} from 'react-router'

class CoursesPage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
  }

  courseRow (course, index) {
    return <div key={index}>{course.title}</div>
  }

  redirectToAddCoursePage () {
    browserHistory.push('/course')
  }

  render () {
    const {courses} = this.props
    return (
      <div>
        <h1>Courses</h1>
        <Link to='/course'>
          <button
            className='btn btn-primary'
          >Add Course</button>
        </Link>
        <CourseList courses={courses} />
      </div>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    courses: state.courses
  }
}

function mapDispatchToProp (dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(CoursesPage)
