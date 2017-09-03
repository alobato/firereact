import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import MobileDetect from 'mobile-detect'

import Alert from './Alert'
import PrimaryButton from './PrimaryButton'

export default class LoginForm extends Component {

  state = {
    credentials: {email: '', password: ''},
    forgotPassword: false
  }

  handleForgotPasswordClick = e => {
    e.preventDefault()
    this.props.onResetNewLoginRequest()
    this.setState({forgotPassword: true})
    if (!(new MobileDetect(window.navigator.userAgent)).mobile()) setTimeout(() => { this.emailInput.focus() }, 200)
  }

  handleBackClick = e => {
    e.preventDefault()
    this.props.onResetNewResetPasswordRequest()
    this.setState({forgotPassword: false})
    if (!(new MobileDetect(window.navigator.userAgent)).mobile()) setTimeout(() => { this.emailInput.focus() }, 200)
  }

  handleInputChange = e => {
    const field = e.target.name
    const credentials = this.state.credentials
    credentials[field] = e.target.value
    return this.setState({credentials: credentials})
  }

  handleSubmit = e => {
    e.preventDefault()
    window.focus()
    if (document.activeElement) document.activeElement.blur()

    if (this.state.forgotPassword)
      this.props.onResetPassword(this.state.credentials.email)
    else
      this.props.onLogin(this.state.credentials)
  }

  componentDidMount() {
    if (!(new MobileDetect(window.navigator.userAgent)).mobile()) setTimeout(() => { if (this.emailInput) this.emailInput.focus() }, 200)
  }

  render() {
    const { onFocus, loginErrorMessage, resetPasswordErrorMessage, resetPasswordSuccessMessage, loginLoading, resetPasswordLoading } = this.props

    const loading = (loginLoading || resetPasswordLoading)

    const valid = () => {
      let result = true
      if (!this.state.credentials || this.state.credentials.email.trim() === '') result = false
      if (!this.state.forgotPassword)
        if (!this.state.credentials || this.state.credentials.password.trim() === '') result = false
      return result
    }

    const disabled = (loading || !valid())

    const buttonText = this.state.forgotPassword ? 'Redefinir senha' : 'Login'

    const formGroupBaseStyle = {marginBottom: '1rem'}
    const formControlBaseStyle = {
      display: 'block',
      width: '100%',
      padding: '.5rem',
      border: '1px solid #bfbfbf',
      borderRadius: '0.25rem',
      boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)'
    }

    return (
      <div>

        <form onSubmit={this.handleSubmit}>

          { this.state.forgotPassword &&
            <div style={{marginBottom: '1rem'}}>
              <span onClick={this.handleBackClick} style={{cursor: 'pointer'}}>← Voltar</span>
            </div>
          }

          <div style={{...formGroupBaseStyle, minHeight: '50px'}}>
            {!this.state.forgotPassword && loginErrorMessage && !loading &&
              <Alert appearance='danger'>{loginErrorMessage}</Alert>
            }
            {this.state.forgotPassword && resetPasswordErrorMessage && !loading &&
              <Alert appearance='danger'>{resetPasswordErrorMessage}</Alert>
            }
            {this.state.forgotPassword && resetPasswordSuccessMessage && !loading &&
              <Alert>{resetPasswordSuccessMessage}</Alert>
            }
          </div>

          <div style={formGroupBaseStyle}>
            <input style={formControlBaseStyle} aria-label='Email' type='email' name='email' placeholder='Email' value={this.state.credentials.email} onChange={this.handleInputChange} onFocus={onFocus} ref={(input) => { this.emailInput = input }} required />
          </div>

          {!this.state.forgotPassword &&
            <div style={formGroupBaseStyle}>
              <input type='password' name='password' aria-label='Senha' placeholder='Senha' value={this.state.credentials.password} onChange={this.handleInputChange} onFocus={onFocus} ref={(input) => { this.passwordInput = input }} required style={formControlBaseStyle} />
              <div style={{textAlign: 'left', fontSize: '14px', textDecoration: 'underline', color: '#757575'}}>
                <span tabIndex='-1' onClick={this.handleForgotPasswordClick} style={{cursor: 'pointer'}}>Esqueci a senha</span>
              </div>
            </div>
          }

          <PrimaryButton id='loginBtn' type='submit' disabled={disabled} loading={loading} style={{minWidth: '120px', paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>{buttonText}</PrimaryButton>
        </form>

        {!this.state.forgotPassword &&
          <div style={{marginTop: '2rem', fontSize: '14px', color: '#757575'}}>
            Ainda não é cadastrado? <NavLink to="/cadastrar" tabIndex='-1'>Cadastre-se agora.</NavLink>
          </div>
        }

      </div>
    )
  }
}
