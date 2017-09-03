import React, { Component } from 'react'

export default class Alert extends Component {

  render() {
    const { children, appearance } = this.props

    const baseStyle = {
      minHeight: '50px',
      padding: '0.75rem 0.5rem',
      border: '1px solid transparent'
    }

    const extraStyle = appearance === 'danger' ? {
      backgroundColor: '#f2dede',
      borderColor: '#ebcccc',
      color: '#a94442'
    } : {
      backgroundColor: '#dff0d8',
      borderColor: '#d0e9c6',
      color: '#3c763d'
    }

    if (children) {
      return (
        <div style={{...baseStyle, ...extraStyle}}>
          {children}
        </div>
      )
    } else {
      return null
    }

  }
}
