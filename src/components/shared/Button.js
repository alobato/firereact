import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Button extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static defaultProps = {
    color: 'inherit',
    borderColor: null,
    bgColor: 'transparent',
    hoverBgColor: 'transparent',
    disabled: false
  }

  handleTouch = e => {
    if (e.target.disabled) return
    if (e.target.classList.contains('hover'))
      e.target.classList.remove('hover')
    else
      e.target.classList.add('hover')
  }

  render() {
    const {id, disabled, onClick, children, loading, style, color, borderColor, bgColor, hoverBgColor, ...other} = this.props
    const border = borderColor ? `1px solid ${borderColor}` : 'none'

    const resetButtonStyle = {
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      padding: 0,
      border: 0,
      overflow: 'visible',
      background: 'transparent',
      WebkitAppearance: 'button',
      cursor: 'pointer',
    }

    let cursor = 'pointer'
    if (disabled) cursor = 'not-allowed'
    if (loading) cursor = 'progress'

    const baseStyle = {
      ...resetButtonStyle,
      position: 'relative',
      borderRadius: '100px',
      fontSize: '1rem',
      border: border,
      backgroundColor: bgColor,
      color: color,
      cursor: cursor,
      ...style
    }

    return (
      <button {...other} disabled={disabled} id={id} onClick={onClick} style={{...baseStyle}} onTouchStart={this.handleTouch} onTouchEnd={this.handleTouch}>
        <style dangerouslySetInnerHTML={{__html: `.no-touch #${id}:hover,#${id}.hover{background-color:${hoverBgColor} !important} #${id}:disabled{cursor:not-allowed;opacity:0.65 !important}`}} />
        {children}
      </button>
    )

  }
}
