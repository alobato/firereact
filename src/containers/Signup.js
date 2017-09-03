import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as sessionsActions from '../actions/sessions'

import { NavLink, Redirect } from 'react-router-dom'

import SignupForm from '../components/shared/SignupForm'

class Signup extends Component {
  state = {
    redirectToReferrer: false
  }

  handleInputFocus = e => {
    if (this.props.newSignup.error)
      setTimeout(() => {this.props.actions.resetNewSignup()}, 200) 
  }

  handleSignup = credentials => {
    this.props.actions.signup(credentials)
      .then(() => {
        this.setState({ redirectToReferrer: true })
      })
  }

  render() {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer) return (<Redirect to={from}/>)

    const { newSignup } = this.props

    return (
      <div style={{width: '300px', textAlign: 'center', margin: '0 auto 1rem auto'}}>

        <SignupForm
          onSignup={this.handleSignup}
          onFocus={this.handleInputFocus}
          errorMessage={newSignup.error}
          loading={newSignup.loading}
          buttonText='Começar a usar'
        />

        <div style={{marginTop: '2rem', fontSize: '14px', color: '#757575'}}>
          Já é cadastrado? <NavLink to='/login' tabIndex='-1'>Faça login.</NavLink>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return { actions: bindActionCreators(sessionsActions, dispatch) }
}

function mapStateToProps(state, ownProps) {
  return {...state.sessions}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
