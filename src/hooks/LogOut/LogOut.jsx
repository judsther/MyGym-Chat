import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../../context/UserDataContext";



export const LogOut = () => {
  const {setData} = useContext(UserContext); 
  
const handleLogout = () => {  signOut(auth).then(() => {
      alert("Sesión cerrada con éxito")
      setData(null)
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      
      // An error happened.
    });
  }
  return(
    <button className="btn btn-outline-dark  mt-auto mb-0 p-2" onClick={handleLogout}>Cerrar Sesión</button>
  );

  } 

      

