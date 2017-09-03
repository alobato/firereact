import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// import { createStore, applyMiddleware } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import * as sessionsActions from './actions/sessions'

import registerServiceWorker from './registerServiceWorker'

import firebase from 'firebase' // FIREBASE

import App from './containers/App'

// const store = createStore(reducers, applyMiddleware(thunk))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const config = { // FIREBASE
  // FIREBASE_CREDENTIALS
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "SENDER_ID"
}
firebase.initializeApp(config) // FIREBASE

store.dispatch(sessionsActions.verifyAuth())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

registerServiceWorker()
