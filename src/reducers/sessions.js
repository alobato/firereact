const initialState = {
  newSignup: {loading: false, errorMessage: null},
  newLogin: {loading: false, errorMessage: null},
  newResetPassword: {loading: false, errorMessage: null, success: null}
}

export default function (state = initialState, action) {
  switch (action.type) {

    case 'SIGNUP_REQUEST':
      return {...state, newSignup: {...state.newSignup, loading: true, errorMessage: null}}
    case 'SIGNUP_SUCCESS':
      return {...state, newSignup: {...state.newSignup, loading: false, errorMessage: null}}
    case 'SIGNUP_FAILURE':
      return {...state, newSignup: {...state.newSignup, loading: false, errorMessage: action.payload.errorMessage}}
    case 'SIGNUP_RESET':
      return {...state, newSignup: {...state.newSignup, loading: false, errorMessage: null}}

    case 'LOGIN_REQUEST':
      return {...state, newLogin: {...state.newLogin, loading: true,  errorMessage: null}}
    case 'LOGIN_SUCCESS':
      return {...state, newLogin: {...state.newLogin, loading: false, errorMessage: null}}
    case 'LOGIN_FAILURE':
      return {...state, newLogin: {...state.newLogin, loading: false, errorMessage: action.payload.errorMessage}}
    case 'LOGIN_RESET':
      return {...state, newLogin: {...state.newLogin, loading: false, errorMessage: null}}

    case 'RESET_PASSWORD_REQUEST':
      return {...state, newResetPassword: {...state.newResetPassword, loading: true,  errorMessage: null, success: null}}
    case 'RESET_PASSWORD_SUCCESS':
      return {...state, newResetPassword: {...state.newResetPassword, loading: false, errorMessage: null, success: action.payload.successMessage}}
    case 'RESET_PASSWORD_FAILURE':
      return {...state, newResetPassword: {...state.newResetPassword, loading: false, errorMessage: action.payload.errorMessage, success: null}}
    case 'RESET_PASSWORD_RESET':
      return {...state, newResetPassword: {...state.newResetPassword, loading: false, errorMessage: null, success: null}}

    case 'LOGOUT':
      return {...state}

    default:
      return state
  }
}
