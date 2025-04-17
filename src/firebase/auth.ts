import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { auth } from "./config";
  
  // Register
  export const registerUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  // Login
  export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // Login with Google
  export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  // Logout
  export const logout = async () => {
    return signOut(auth);
  };