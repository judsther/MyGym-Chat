import logoMGC from "../../assets/images/logoMGC.png";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";
import { auth } from "../../services/Firebase/firebase-config";


export function Home() {
  const navigate = useNavigate();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/Welcome");
      } else {
        navigate("/");
      }
    });


    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="row text-center py-5 px-3 mt-5 d-flex align-items-center justify-content-center">
      <br />
      <div id="Home" className="container-fluid">
        <img
          src={logoMGC}
          alt="Logo"
          width="200"
          className="d-inline-block m-3"
        />
        <h4>¡Bienvenido/a! ¿Primera vez en nuestro ecosistema fit?</h4>
        <h5>
          Registrate y no te pierdas las novedades de tu gym, en nuestro chat
          podés consultar las horas picos o buscar ayuda en tus rutinas ¡Un solo
          chat para conectar con todos los gymrats de tu gimnasio!
        </h5>
        <br></br>
        <Link to="/Registro">
          <button
            type="button"
            className="btn boton btn-outline-light btn-lg mx-2 m-2"
          >
            Registrarme
          </button>
        </Link>
        <Link to="/IniciarSesion">
          <button
            type="button"
            className="btn boton2 btn-outline-info btn-lg mx-2 m-2"
          >
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}
