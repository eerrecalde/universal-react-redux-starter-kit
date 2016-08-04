import React, { PropTypes } from 'react'
import Header from './Header/Header'
import {connect} from 'react-redux'

class App extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  }
}

export default connect(mapStateToProps)(App)
