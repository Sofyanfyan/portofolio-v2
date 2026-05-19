'use client'

import { GoogleAuthProvider, getAuth } from 'firebase/auth'

import { firebase } from './firebase'

export const auth = getAuth(firebase)
export const googleAuthProvider = new GoogleAuthProvider()

googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
})
