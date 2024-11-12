import logoMGC from "../../assets/images/logoMGC.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../services/Firebase/firebase-config";
import "./Home.css";

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
    <div>
    <div className="row text-center pt-1 px-3 mt-5 d-flex">
      <br />
      <section id="Home" className="container-fluid align-items-center justify-content-center">
        <img src={logoMGC} alt="Logo" width="250" className="d-inline-block m-3"/>
        <h4>¡Bienvenido/a! ¿Primera vez en nuestro ecosistema fit?</h4>
        <h5 className="d-flex pt-3 px-4 ">
          Registrate y no te pierdas las novedades de tu gym, en nuestro chat
          podés consultar las horas picos o buscar ayuda en tus rutinas ¡Un solo
          chat para conectar con todos los gymrats de tu gimnasio!
        </h5>

        <br></br>
        <Link to="/Registro">
          <button type="button" className="btn boton btn-outline-light btn-lg mx-2 m-2" >
            Registrarme
          </button>
        </Link>
        <Link to="/IniciarSesion">
          <button type="button" className="btn boton2 btn-outline-info btn-lg mx-2 m-2" >
            Iniciar Sesión
          </button>
        </Link>
      </section>
      </div>

      <section className="seccion2 mt-5 text-light text-center row">
       

          <div className="col-12 col-md-4 py-3">
          <i className="iconos2 fas fa-message"></i>
          <h5>¡Un solo chat para cada gym!</h5>
          </div>

          <div className="col-12 col-md-4 py-3">
          <i className="iconos2 fas fa-hands-clapping"></i>
          <h5>Celebra los logros de otros y comparte los tuyos.</h5>
          </div>

          <div className="col-12 col-md-4 py-3">
          <i className="iconos2 fa-solid fa-handshake"></i>
          <h5>De extraños a gym partners.</h5>
          </div>

       
      </section>

    </div>
  );
}
