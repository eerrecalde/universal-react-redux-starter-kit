import React, { PropTypes } from 'react'
import Header from './common/Header'
import {connect} from 'react-redux'

class App extends React.Component {
  render () {
    return (
      <div className='container-fluid'>
        <Header className='text-center'
          loading={this.props.loading}
        />
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
