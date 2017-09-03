import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as sessionsActions from '../actions/sessions'

import LoginForm from '../components/shared/LoginForm'

class Login extends Component {
  state = {
    forgotPassword: false
  }

  handleInputFocus = e => {
    if (this.props.newLogin.errorMessage || this.props.newResetPassword.errorMessage)
      setTimeout(() => {this.props.actions.resetNewLogin(); this.props.actions.resetNewResetPassword()}, 200) 
  }

  handleLogin = credentials => {
    this.props.actions.login(credentials)
  }

  handleResetPassword = email => {
    this.props.actions.resetPassword(email)
  }

  render() {
    const { newLogin, newResetPassword } = this.props

    return (
      <div style={{width: '300px', textAlign: 'center', margin: '0 auto 1rem auto'}}>
        <LoginForm
          onLogin={this.handleLogin}
          onResetPassword={this.handleResetPassword}
          onFocus={this.handleInputFocus}
          loginErrorMessage={newLogin.errorMessage}
          resetPasswordErrorMessage={newResetPassword.errorMessage}
          resetPasswordSuccessMessage={newResetPassword.success}
          loginLoading={newLogin.loading}
          resetPasswordLoading={newResetPassword.loading}
          onResetNewResetPasswordRequest={() => this.props.actions.resetNewResetPassword()}
          onResetNewLoginRequest={() => this.props.actions.resetNewLogin()}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
