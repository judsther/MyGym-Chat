/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/Firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore"; // Importa Firestore

export const UserContext = createContext("");
export const MyProvider = ({ children }) => {
  const [data, setData] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        const userDoc = await getDoc(doc(db, "users", user.uid)); 
        if (userDoc.exists()) {
          const userData = userDoc.data();
       
          setData({
            ...user,
            username: userData.username,
            profilePicture: userData.profilePicture,
          });
        } else {
          console.log("No se encontró el documento del usuario en Firestore.");
          setData(user); 
        }
      } else {
        setData(null); 
      }
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};
