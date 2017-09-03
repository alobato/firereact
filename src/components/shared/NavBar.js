import React, { Component } from 'react'

export default class NavBar extends Component {

  static defaultProps = {
    style: {}
  }

  render() {
    return (
      <nav
        style={{
          position: 'fixed',
          top: 0, right: 0, left: 0,
          width: '100%',
          zIndex: 2,
          backgroundColor: '#eceeef',
          userSelect: 'none',
          ...this.props.style
        }}
      >
        {this.props.children}
      </nav>
    )
  }

}
