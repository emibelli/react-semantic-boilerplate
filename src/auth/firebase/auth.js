import { auth, facebookAuthProvider, googleAuthProvider } from './firebase';

// Sign Up with Email and Password
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In with Email and Password
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Password Reset for Email
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change for Email
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

// Sign Up / Sign In with Facebook
export const doSignInWithFacebook = () =>
  auth.signInWithPopup(facebookAuthProvider);

// Sign Up / Sign In with Google
export const doSignInWithGoogle = () =>
  auth.signInWithPopup(googleAuthProvider);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Check Auth State Changed
export const checkAuthStateChanged = (handler) =>
  auth.onAuthStateChanged(handler);

// Get Current User ID Token
export const doGetIdToken = () =>
  auth.currentUser.getIdToken(true);

// Get Current User
export const doGetCurrentUser = () =>
  auth.currentUser;

