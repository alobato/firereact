export const baseUrl = 'http://localhost:4000'

export function currentUser() {
  let keys = []
  for(let k in localStorage) keys.push(k)

  let foundKey
  for (let i = 0; i < keys.length; i++)
    if (keys[i].match(/firebase:authUser/)) foundKey = keys[i]

  if (!foundKey) return null

  try {
    const data = JSON.parse(localStorage.getItem(foundKey))
    if (!data) return null
    return data
  } catch(e) {
    return null
  }
}

// export function currentUser() {
//   let keys = []
//   for(let k in localStorage) keys.push(k)

//   let foundKey
//   for (let i = 0; i < keys.length; i++)
//     if (keys[i].match(/authUser/)) foundKey = keys[i]

//   if (!foundKey) return null

//   try {
//     const data = JSON.parse(localStorage.getItem(foundKey))
//     if (!data) return null
//     return data
//   } catch(e) {
//     return null
//   }
// }

export function currentUserUid() {
  if (currentUser()) return currentUser().uid
  return null
}
