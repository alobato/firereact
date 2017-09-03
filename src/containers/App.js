import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as sessionsActions from '../actions/sessions'

import { currentUser } from '../utilities'

import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom'

import Login from '../containers/Login'
import Signup from '../containers/Signup'

import Menu from '../components/shared/Menu'
import NavBar from '../components/shared/NavBar'

const PrivateRoute = ({component, ...rest}) => (
  <Route {...rest} render={props => {
    if (props.location.pathname === '/cadastrar' || props.location.pathname === '/login') return null
    if (!!currentUser()) return React.createElement(component, props)
    return (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
  }} />
)

const NotLoggedInRoute = ({component, ...rest}) => (
  <Route {...rest} render={props => {
    if (!!currentUser()) return (<Redirect to={{pathname: '/', state: {from: props.location}}} />)
    return React.createElement(component, props)
  }} />
)

class App extends Component {
  state = {
    menuOpen: false
  }

  logout = e => {
    e.preventDefault()
    this.props.actions.logout()
      .then(() => this.forceUpdate())
  }

  handleTouch = e => {
    if (e.target.disabled) return
    if (e.target.classList.contains('hover'))
     e.target.classList.remove('hover')
    else
      e.target.classList.add('hover')
  }

  componentWillMount() {
    if (!('ontouchstart' in document.documentElement)) document.documentElement.className += 'no-touch'
  }

  render() {
    const resetStyle = `
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  -webkit-tap-highlight-color: transparent;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 
    "Segoe UI", "Roboto", "Oxygen", 
    "Ubuntu", "Cantarell", "Fira Sans", 
    "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #305479;
  background-color: #fff;
  padding-top: calc(44px + 1rem);
  padding-bottom: 2rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  list-style-type: none;
}

td {
  padding: 0;
}

a {
  color: inherit;
}

p {
  margin: 0
}

h1, h2, h3, h4 {
  margin: 0;
  font-size: inherit;
}

button {
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: normal;
  padding: 0;
  border: 0;
  overflow: visible;
  background: transparent;
  -webkit-appearance: button;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  outline: 0;
  user-select: none;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
       -moz-user-select: none; /* Firefox */
}

input, select {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  background-color: white;
  background-image: none;
  background-clip: padding-box;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #aaa;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #aaa;
  opacity: 1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #aaa;
  opacity: 1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #aaa;
}
`
    let logo = (
      <span>
        Logo
      </span>
    )

    if (window.location.pathname === '/app/login' || window.location.pathname === '/app/cadastrar')
      logo = (<a href='/' style={{display: 'inline-block'}}>{logo}</a>)

    return (
      <BrowserRouter basename='/app'>
        <div>
          <style dangerouslySetInnerHTML={{__html: resetStyle }} />

          <Menu open={this.state.menuOpen} onRequestClose={e => this.setState({menuOpen: false})}>
            {!!currentUser() && (
              <div style={{padding: '0.5rem 1rem', fontSize: '14px'}}>
                <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                  {currentUser().displayName}
                </div>
                <div>{currentUser().email}</div>
              </div>
            )}
            <ul style={{marginTop: '1.5rem'}}>
              <li style={{borderBottom: '1px solid #eceeef'}}><a style={{display: 'block', padding: '0.5rem 0.5rem 0.5rem 1rem', textDecoration: 'none'}} href="/sair" onClick={this.logout} onTouchStart={this.handleTouch} onTouchEnd={this.handleTouch}>Sair</a></li>
            </ul>
          </Menu>

          <NavBar style={{height: '40px'}}>
            <div style={{display: 'inline-block', float: 'left', padding: '0.5rem 0 0 0.5rem', lineHeight: 0}}>{logo}</div>
            {!!currentUser() ? (
              <button style={{position: 'absolute', right: 0, padding: '0.75rem 1rem 0.75rem', lineHeight: 0}} onClick={e => this.setState({menuOpen: true})} onTouchStart={this.handleTouch} onTouchEnd={this.handleTouch}>
                <img style={{width: '23px', height: '16px', pointerEvents: 'none'}} alt='Menu' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAgAQMAAABXfdgEAAAABlBMVEUAAAAwVHl2Ag2XAAAAAXRSTlMAQObYZgAAABNJREFUCNdj+A8Cf7BTVAEDawMAU8tHlWh7bvMAAAAASUVORK5CYII=" />
              </button>
            ) : (
              <ul style={{float: 'right', lineHeight: 'normal'}}>
                <style dangerouslySetInnerHTML={{__html: `a.active{font-weight:700}` }} />
                <li style={{float: 'left'}}><NavLink to='/cadastrar' style={{display: 'block', padding: '0.8rem', textDecoration: 'none'}}>Cadastrar</NavLink></li>
                <li style={{float: 'left'}}><NavLink to='/login' style={{display: 'block', padding: '0.8rem', textDecoration: 'none'}}>Login</NavLink></li>
              </ul>
            )}
          </NavBar>
      
          <NotLoggedInRoute exact path='/login' component={Login} />
          <NotLoggedInRoute exact path='/cadastrar' component={Signup} />
        </div>
      </BrowserRouter>
    )
  }
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators({...sessionsActions}, dispatch)}
}

function mapStateToProps(state, ownProps) {
  return {...state.sessions}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
