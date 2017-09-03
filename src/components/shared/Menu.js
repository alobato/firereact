import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'

export default class Menu extends Component {

  defaultStyles() { return { key: 'menu', style: { opacity: spring(1), position: spring(0, {stiffness: 250, damping: 25}) } } }
  willEnter() { return { opacity: 0, position: -100 } }
  willLeave() { return { opacity: spring(0, {stiffness: 350, damping: 30}), position: spring(-100, {stiffness: 350, damping: 30}) } }

  renderModal(key, style) {
    return (
      <div
        onClick={this.props.onRequestClose}
        key={key}
        style={{
          opacity: style.opacity,
          position: 'fixed',
          top: 0, right: 0, bottom: 0, left: 0,
          zIndex: 1040,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          userSelect: 'none'
        }}
      >

        <div style={{width: '250px', height: '100%', transform: `translateX(${style.position}%)`}}>
          <div>
            <div
              style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                width: '250px',
                zIndex: '-1',
                backgroundColor: 'hsla(0, 0%, 100%, 0.95)',
                userSelect: 'none'
              }}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <TransitionMotion styles={this.props.open ? [this.defaultStyles()] : []} willEnter={this.willEnter} willLeave={this.willLeave}>
        {items => (items.length ? this.renderModal(items[0].key, items[0].style) : null)}
      </TransitionMotion>
    )
  }

}
