// AuthContext.js
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/Firebase"; // Your Firebase auth import
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth"; // Import Firebase auth functions

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({ type: "SET_USER", payload: user });
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (
    email,
    password,
    name,
    navigate,
    SetDisable,
    setErrorMsg
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await updateProfile(user, { displayName: name });
      navigate("/");
    } catch (err) {
      SetDisable(false);
      setErrorMsg(err.message);
    }
  };

  const signIn = async (email, password, navigate, SetDisable, setErrorMsg) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      SetDisable(false);
      setErrorMsg(err.message);
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user: state.user,
    signUp,
    signIn,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
