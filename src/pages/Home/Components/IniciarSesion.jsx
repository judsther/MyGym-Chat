
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from "./Auth/Auth";
import { auth, db } from "../../../services/Firebase/firebase-config";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserDataContext";
import { doc, getDoc } from "firebase/firestore";



export function IniciarSesion() {
  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(loginSchema)
  });

  const { setData } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    console.log(data);

    try {
      await setPersistence(auth, browserLocalPersistence);

      // Autenticar con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Obtener el `username` de Firestore usando el user.uid
      const userDoc = await getDoc(doc(db, "users", user.uid)); 
      if (userDoc.exists()) {
        const userData = userDoc.data(); // Obtiene los datos del documento de Firestore
        console.log("Usuario de Firestore:", userData);

       // Guarda el username en el contexto
        setData({ ...user, username: userData.username });
    } else {
        console.log("No se encontró información del usuario en Firestore.");
      }

      // Redirigir a la vista de bienvenida
      navigate('/Welcome');
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  };

   

    return(
        <>
        <div className='row text-center py-5 px-3 mt-5 d-flex align-items-center justify-content-center'>

<form onSubmit={handleSubmit(onSubmitForm)}>
    <section className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" autoComplete="email" aria-describedby="emailHelp"{...register('email')}/>
    <div id="emailHelp" className="form-text text-secondary">Tu información está a salvo con nosotros.</div>
    <p style={{color:"fusia"}}>{errors.email && errors.email.message}</p>

    </section>
    <section className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" placeholder="enter password"{...register('password')}/>
    <p style={{color:"deeppink"}}>{errors.password && errors.password.message}</p>
    </section>

    <button type="submit" className="btn btn-primary">Entrar</button>
    <br></br>
    <br></br>
    <Link className="text-primary" to='/'>Regresar</Link>
</form>  
</div>  
        </> 

         )
}