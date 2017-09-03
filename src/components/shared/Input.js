import React, { Component } from 'react'

export default class Input extends Component {

  static defaultProps = {
    type: 'text',
    validationBadge: true
  }

  state = {
    isValid: false,
    showValidStatus: false
  }

  isValid() {
    const value = this.input.value
    if (this.props.required && value.trim() === '') return false
    if (this.props.exactLength && value.length !== this.props.exactLength) return false
    if (this.props.type === 'email') return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    return true
  }

  handleBlur = e => {
    this.setState({showValidStatus: true, isValid: this.isValid()})
  }

  handleFocus = e => {
    this.setState({showValidStatus: false})
  }

  handleInputChange = e => {
    const value = e.target.value

    if (this.props.onlyNumbers)
      if (value !== '' && !/^\d+$/.test(value)) return false

    this.setState({isValid: this.isValid()})

    if (this.props.exactLength && value.length === this.props.exactLength)
      this.setState({showValidStatus: true})
    else
      this.setState({showValidStatus: false})

    this.props.onChange(e)
  }

  render() {
    let style = this.props.style
    if (this.state.showValidStatus && !this.state.isValid) style = {...style, border: '1px solid #a94442'}

    return (
      <div style={{position: 'relative'}}>
        <input style={style} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} maxLength={this.props.maxLength} value={this.props.value} onChange={this.handleInputChange} onBlur={this.handleBlur} onFocus={this.handleFocus} ref={(input) => {this.input = input}} required={this.props.required} />
        {this.props.validationBadge && this.state.showValidStatus && this.state.isValid && (
          <span
            style={{
              position: 'absolute',
              display: 'inline-block',
              lineHeight: 0,
              top: '9px', right: '9px',
              padding: '5px',
              borderRadius: '4px',
              backgroundColor: '#dff0d8',
              color: '#3c763d'
            }}
          >
            <svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor'>
              <path strokeWidth='2' stroke='currentColor' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'></path>
            </svg>
          </span>
        )}
        {this.props.validationBadge && this.state.showValidStatus && !this.state.isValid && (
          <span
            style={{
              position: 'absolute',
              display: 'inline-block',
              lineHeight: 0,
              top: '9px', right: '9px',
              padding: '5px',
              borderRadius: '4px',
              backgroundColor: '#f2dede',
              color: '#a94442'
            }}
          >
            <svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor'>
              <path strokeWidth='2' stroke='currentColor' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
          </span>
        )}
      </div>

    )

  }
}
