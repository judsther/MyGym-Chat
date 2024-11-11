import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase/firebase-config";
import { useContext } from "react";
import { UserContext } from "../../context/UserDataContext";
import { Link } from "react-router-dom";

export const LogOut = () => {
  const { setData } = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Sesión cerrada con éxito");
        setData(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (

    <Link className="text-decoration-none"  style={{ color: "#513fb6" }} onClick={handleLogout}>
      Cerrar Sesión
    </Link>
  
  );
};
