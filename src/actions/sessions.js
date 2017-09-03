import { currentUser, baseUrl } from '../utilities'
import firebase from 'firebase'

// export function login(credentials) {
//   return dispatch => {
//     dispatch({type: 'LOGIN_REQUEST'})
//     return (
//       fetch(`${baseUrl}/sign_in_with_email_and_password`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: `{"email": "${credentials.email}", "password": "${credentials.password}"}` })
//         .then(response => {
//           return response.json()
//         })
//         .then(data => {
//           if (data.error) {
//             return Promise.reject(data.error)
//           } else {
//             if (data.token) {
//               localStorage.setItem('authUser', JSON.stringify(data))
//               dispatch({type: 'LOGIN_SUCCESS'})
//             } else {
//               return Promise.reject({code: 'auth/without-token'})
//             }
//           }
//         })
//         .catch(error => {
//           let errorMessage = 'Ocorreu um erro'
//           if (error.code === 'auth/user-not-found') errorMessage = 'Email não cadastrado'
//           if (error.code === 'auth/wrong-password') errorMessage = 'A senha está incorreta'
//           dispatch({type: 'LOGIN_FAILURE', payload: {errorMessage: errorMessage}})
//         })
//     )
//   }
// }

export function login(credentials) {
  return dispatch => {
    dispatch({type: 'LOGIN_REQUEST'})
    return (
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(user => {
          dispatch({type: 'LOGIN_SUCCESS'})
        }).catch(error => {
          let errorMessage = 'Ocorreu um erro'
          if (error.code === 'auth/network-request-failed') errorMessage = 'Erro na conexão'
          if (error.code === 'auth/user-not-found') errorMessage = 'Email não cadastrado'
          if (error.code === 'auth/wrong-password') errorMessage = 'A senha está incorreta'
          dispatch({type: 'LOGIN_FAILURE', payload: {errorMessage: errorMessage}})
        })
    )
  }
}

// clean error message when focus email or password
export function resetNewLogin() {
  return dispatch => { dispatch({type: 'LOGIN_RESET'}) }
}

export function resetPassword(email) {
  return dispatch => {
    dispatch({type: 'RESET_PASSWORD_REQUEST'})
    return (
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          dispatch({type: 'RESET_PASSWORD_SUCCESS', payload: {successMessage: 'Instruções foram enviadas para seu email'}})
        }).catch(error => {
          let errorMessage = 'Erro ao enviar email'
          if (error.code === 'auth/user-not-found') errorMessage = 'Este email não está cadastrado'
          dispatch({type: 'RESET_PASSWORD_FAILURE', payload: {errorMessage: errorMessage}})
        })
    )
  }
}

// clean error message when focus email field
export function resetNewResetPassword() {
  return dispatch => { dispatch({type: 'RESET_PASSWORD_RESET'}) }
}

export function signup(credentials) {
  return dispatch => {
    dispatch({type: 'SIGNUP_REQUEST'})
    return (
      new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then(user => {
            user.updateProfile({displayName: credentials.name})
            const currentUser = {email: user.email, uid: user.uid, displayName: credentials.name}
            firebase.database().ref(`/users/${user.uid}`).set({displayName: currentUser.displayName, email: currentUser.email, p: credentials.password, created_at: (new Date()).getTime()})
            dispatch({type: 'SIGNUP_SUCCESS'})
            resolve()
          })
          .catch(error => {
            let errorMessage = 'Erro ao efetuar cadastro'
            if (error.code === 'auth/network-request-failed') errorMessage = 'Erro na conexão'
            if (error.code === 'auth/weak-password') errorMessage = 'A senha deve ter pelo menos 6 caracteres'
            if (error.code === 'auth/email-already-in-use') errorMessage = 'Já existe uma conta com este email'
            dispatch({type: 'SIGNUP_FAILURE', payload: {errorMessage}})
            reject(error)
          })
      })
    )
  }
}

// export function signup(credentials) {
//   return dispatch => {
//     dispatch({type: 'SIGNUP_REQUEST'})
//     return (
//       fetch(`${baseUrl}/create_user_with_email_and_password`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: `{"email": "${credentials.email}", "password": "${credentials.password}"}` })
//         .then(response => {
//           return response.json()
//         })
//         .then(data => {
//           console.log('data', data)
//           if (data.error) {
//             return Promise.reject(data.error)
//           } else {
//             if (data.token) {
//               localStorage.setItem('authUser', JSON.stringify(data))
//               dispatch({type: 'SIGNUP_SUCCESS'})
//               Promise.resolve()
//             } else {
//               return Promise.reject({code: 'auth/without-token'})
//             }
//           }
//         })
//         .catch(error => {
//           let errorMessage = 'Ocorreu um erro'
//           if (error.code === 'auth/weak-password') errorMessage = 'A senha deve ter pelo menos 6 caracteres'
//           if (error.code === 'auth/email-already-in-use') errorMessage = 'Já existe uma conta com este email'
//           dispatch({type: 'SIGNUP_FAILURE', payload: {errorMessage: errorMessage}})
//         })
//     )
//   }
// }


export function resetNewSignup() {
  return dispatch => { dispatch({type: 'SIGNUP_RESET'}) }
}

export function logout() {
  return dispatch => {
    return firebase.auth().signOut().then(() => dispatch({type: 'LOGOUT'}))
  }
}

// export function logout() {
//   return dispatch => {
//     return (
//       new Promise((resolve, reject) => {
//         localStorage.removeItem('authUser')
//         dispatch({type: 'LOGOUT'})
//         resolve()
//       })
//     )
//   }
// }

export function verifyAuth() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user && currentUser()) {
        return firebase.auth().signOut().then(() => dispatch({type: 'LOGOUT'}))
      }
    })
  }
}

// export function verifyAuth() {
//   return dispatch => {
//     if (!!localStorage.getItem('authUser')) {
//       console.log("dispatch({type: 'LOGIN_SUCCESS'})")
//       dispatch({type: 'LOGIN_SUCCESS'})
//     } else {
//       console.log("dispatch({type: 'LOGOUT'})")
//       dispatch({type: 'LOGOUT'})
//     }
//   }
// }
