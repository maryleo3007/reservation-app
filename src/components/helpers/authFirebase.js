import { ref, firebaseAuth } from '../../services/firebase'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  console.log('log out correcto');
  
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}