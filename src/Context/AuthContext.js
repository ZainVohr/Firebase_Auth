import { useContext, createContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);
  console.log(data.user.stsTokenManager.accessToken);
  localStorage.setItem("token", data.user.stsTokenManager.accessToken);
};

const logout = () => {
  signOut(auth);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
