import React, { Component } from 'react'
import MobileDetect from 'mobile-detect'

import Alert from './Alert'
import PrimaryButton from './PrimaryButton'

export default class SignupForm extends Component {

  state = {
    credentials: {name: '', email: '', password: ''}
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

    this.props.onSignup(this.state.credentials)
  }

  componentDidMount() {
    if (!(new MobileDetect(window.navigator.userAgent)).mobile()) setTimeout(() => { if (this.nameInput) this.nameInput.focus() }, 200)
  }

  render() {
    const { errorMessage, loading, buttonText, onFocus } = this.props

    const valid = () => {
      let result = true
      if (!this.state.credentials || this.state.credentials.name.trim() === '') result = false
      if (!this.state.credentials || this.state.credentials.email.trim() === '') result = false
      if (!this.state.credentials || this.state.credentials.password.trim() === '') result = false
      return result
    }

    const disabled = (loading || !valid())

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
      <div style={{width: '300px', textAlign: 'center', margin: '0 auto'}}>

        <form onSubmit={this.handleSubmit}>

          {errorMessage && !loading &&
            <div style={{...formGroupBaseStyle, minHeight: '50px'}}>
              <Alert appearance='danger'>{errorMessage}</Alert>
            </div>
          }

          <div style={formGroupBaseStyle}>
            <input type='name' name='name' aria-label='Seu nome' placeholder='Seu nome' value={this.state.credentials.name} onChange={this.handleInputChange} onFocus={onFocus} ref={(input) => { this.nameInput = input }} required style={formControlBaseStyle} />
          </div>

          <div style={formGroupBaseStyle}>
            <input type='email' name='email' aria-label='Email' placeholder='Email' value={this.state.credentials.email} onChange={this.handleInputChange} onFocus={onFocus} ref={(input) => { this.emailInput = input }} required style={formControlBaseStyle} />
          </div>

          <div style={formGroupBaseStyle}>
            <input type='password' name='password' aria-label='Senha' placeholder='Senha' value={this.state.credentials.password} onChange={this.handleInputChange} onFocus={onFocus} ref={(input) => { this.passwordInput = input }} required style={formControlBaseStyle} />
          </div>

          <div style={{fontSize: '11px', marginBottom: '1.5rem', color: '#757575'}}>Cadastrando-se você concorda com os <a href='/termos.html' target='_blank' rel='noopener noreferrer'>termos de uso</a>.</div>

          <PrimaryButton id='signupBtn' type='submit' disabled={disabled} loading={loading} style={{minWidth: '110px', paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>{buttonText}</PrimaryButton>
        </form>

      </div>
    )
  }
}
