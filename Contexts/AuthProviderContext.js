import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();
export const AuthProvider = ({ children })=>{
    const [ user, setUser ] = useState(null);
    return(
        <AuthContext.Provider value={{
            user,
            setUser,
            login: async (email, password)=>{
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Login error: "+ errorMessage);
                });
            },
            signUp: async (email, password)=>{
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Login error: "+ errorMessage);
                });
            },
            signOut: async ()=>{
                signOut(auth).then(() => {
                    // Sign-out successful.
                    console.log("User logged out successfully...");
                  }).catch((error) => {
                    console.log("User logged out with error...");
                  });
            }

        }} >
            { children }
        </AuthContext.Provider>
    );
}