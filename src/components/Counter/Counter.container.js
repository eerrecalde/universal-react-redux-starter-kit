import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../../actions/counterActions'
import Counter from './Counter'

export class CounterContainer extends Component {

  constructor (props, context) {
    super(props, context)

    this.state = {
      counter: props.counter,
      saving: false
    }

    this.increment = this.increment.bind(this)
    this.doubleAsync = this.doubleAsync.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({counter: nextProps.counter})
  }

  increment (event) {
    event.preventDefault()
    let counter = this.state.counter
    this.setState({counter: counter})
    this.setState({saving: true})

    // Here we're calling the action 'incrementCounterByOne' to update the store, which returns the updated state
    // We use the returned new state to update the value in the DB through the action 'updateDB'.
    this.props.actions.updateCounterInDB(this.props.actions.incrementCounterByOne(counter))
      .then(() => {
        this.setState({saving: false})
      })
      .catch((error) => {
        alert(error)
        this.setState({saving: false})
      })
  }

  doubleAsync () {
    let counter = this.state.counter
    this.setState({counter: counter})
    this.setState({saving: true})
    this.props.actions.updateCounterInDB(this.props.actions.incrementCounterByDouble(counter))
      .then(() => {
        this.setState({saving: false})
      })
      .catch((error) => {
        alert(error)
        this.setState({saving: false})
      })
  }

  render () {
    return (
      <Counter
        onIncrement={this.increment}
        onDoubleAsync={this.doubleAsync}
        counter={this.state.counter}
      />
    )
  }
}

CounterContainer.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React Router context so router is available on this.context.router
CounterContainer.contextTypes = {
  router: PropTypes.object
}

// If we do expensive work in these maps,
// we could use reselect to memoize the data once it's calculated, so we don't recalculate it again each time.
function mapStateToProps (state, ownProps) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProp (dispatch) {
  return {
    actions: bindActionCreators(counterActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(CounterContainer)
