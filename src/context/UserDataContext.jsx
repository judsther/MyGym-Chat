/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/Firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore"; // Importa Firestore

export const UserContext = createContext("");

export const MyProvider = ({ children }) => {
  const [data, setData] = useState(null);

  // Verificar el estado del usuario al cargar la app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore (e.g., username)
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Buscar el documento del usuario en Firestore
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Guarda los datos del usuario, incluyendo el `username`
          setData({ ...user, username: userData.username });
        } else {
          console.log("No se encontró el documento del usuario en Firestore.");
          setData(user); // Si no hay datos en Firestore, solo guarda lo que viene de Auth
        }
      } else {
        setData(null); // Limpiar los datos del usuario cuando no esté autenticado
      }
    });

    // Cleanup function para cuando se desmonte el componente
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};
