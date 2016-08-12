import React, {PropTypes} from 'react'
import Helmet from 'react-helmet'
import classes from './Counter.scss'

const Counter = ({counter, onIncrement, onDoubleAsync}) => {
  return (
    <div>
      <Helmet title='Counter' />
      <h2 className={classes.counterContainer}>
        Counter:
        {' '}
        <span className={classes['counter--green']}>
          {counter}
        </span>
      </h2>
      <button className='btn btn-default' onClick={onIncrement}>
        Increment
      </button>
      {' '}
      <button className='btn btn-default' onClick={onDoubleAsync}>
        Double (Async)
      </button>
    </div>
  )
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDoubleAsync: PropTypes.func.isRequired
}

export default Counter
