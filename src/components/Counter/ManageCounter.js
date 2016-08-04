import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as counterActions from '../../actions/counterActions'
import Counter from './Counter'

export class ManageCounter extends Component {

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
    let counter = this.state.counter + 1
    this.setState({counter: counter})
    this.setState({saving: true})
    this.props.actions.incrementCounter(counter)
      .then(() => {
        console.log('Increment Saved!!')
        this.setState({saving: false})
      })
      .catch((error) => {
        alert(error)
        this.setState({saving: false})
      })
  }

  doubleAsync () {
    let counter = this.state.counter * 2
    this.setState({counter: counter})
    this.setState({saving: true})
    this.props.actions.incrementCounter(counter)
      .then(() => {
        console.log('doubleAsync Saved!!')
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

ManageCounter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React Router context so router is available on this.context.router
ManageCounter.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProp)(ManageCounter)
