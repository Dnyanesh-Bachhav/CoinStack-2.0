import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useRef, useState } from "react";
import app, { auth } from "../firebaseConfig";
import { Timestamp, collection, doc, getFirestore, setDoc } from "firebase/firestore";

export const AuthContext = createContext();
export const AuthProvider = ({ children })=>{
    const [ user, setUser ] = useState(null);
    const [ authLoading, setAuthLoading ] = useState(false);
    const [ firestoreUser, setFirestoreUser ] = useState();
    const authError = useRef(null);
    return(
        <AuthContext.Provider value={{
            user,
            setUser,
            firestoreUser,
            setFirestoreUser,
            authLoading,
            setAuthLoading,
            authError,
            login: async (email, password)=>{
                setAuthLoading(true);
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
                    authError.current = { code: errorCode, message: errorMessage };
                }).finally(()=>{
                    setAuthLoading(false);
                })
            },
            signUp: async (email, password, phone, displayName)=>{
                createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed up
                    const db = getFirestore(app);
                    // const collection_ref = collection(db, "users");
                    setDoc(doc(db, "users", auth.currentUser.uid),{
                        name: displayName,
                        email,
                        // password,
                        userImg: null,
                        phone,
                        createdAt: Timestamp.now(),
                    }).then(()=>{
                        console.log("user added...");                        
                    })
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