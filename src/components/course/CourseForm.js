import React, {PropTypes} from 'react'
import TextInput from '../common/TextInput'
import SelectInput from '../common/SelectInput'

const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name='title'
        label='Title'
        value={course.title}
        onChange={onChange}
        error={errors.title} />

      <SelectInput
        name='authorId'
        label='Author'
        value={course.authorId}
        defaultOption='Select Author'
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId} />

      <TextInput
        name='category'
        label='Category'
        value={course.category}
        onChange={onChange}
        error={errors.category} />

      <TextInput
        name='length'
        label='length'
        value={course.length}
        onChange={onChange}
        error={errors.length} />

      <button
        disabled={saving}
        className='btn btn-primary'
        value={saving ? 'Saving..' : 'Save'}
        onClick={onSave}>
        {saving ? 'Saving..' : 'Save'}
      </button>
    </form>
  )
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
}

export default CourseForm
