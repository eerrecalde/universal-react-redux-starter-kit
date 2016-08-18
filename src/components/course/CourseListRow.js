import React, {PropTypes} from 'react'
import {Link} from 'react-router'

const CourseListRow = (props) => {
  let styles1 = require('./CourseListRow.scss')
  return (
    <tr>
      <td t="1" className={styles1.trEl}><a href={props.course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + props.course.id}>{props.course.title}</Link></td>
      <td>{props.course.authorId}</td>
      <td>{props.course.category}</td>
      <td>{props.course.length}</td>
    </tr>
  )
}

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
}

export default CourseListRow
