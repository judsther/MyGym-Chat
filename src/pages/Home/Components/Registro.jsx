
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from "./Auth/Auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../services/Firebase/firebase-config";

import './Registro.css'
import { doc, setDoc } from "firebase/firestore";

export const Registro = () => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(registerSchema)
});

const navigate = useNavigate();

  const onSubmitForm = (data) => {
       console.log(data);

       //FIREBASE AUTHENTICATION
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // Actualizar el perfil del usuario con el username
    updateProfile(user, {
      displayName: data.username, // Aquí guardas el username en el perfil del usuario
    })
      .then(async () => {
        // También puedes guardar el username en Firestore si lo necesitas
        await setDoc(doc(db, "users", user.uid), {
          username: data.username,
          email: data.email,
        });

        console.log("Username actualizado en el perfil y guardado en Firestore");

        // Redirigir a la vista de bienvenida
        navigate('/IniciarSesion');
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error.message);
      });
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.error("Error al crear usuario:", errorMessage);
  });
};
     

  return (
    <>
        <div className='row text-center py-5 px-3 mt-5 d-flex align-items-center justify-content-center'>

    <form onSubmit={handleSubmit(onSubmitForm)}>
    <section className="mb-3">
    <label htmlFor="username" className="form-label" >Nombre de Usuario</label>
    <input type="text" className="form-control forminputs" id="username" autoComplete="username" aria-describedby="userlHelp"{...register('username')}/>
    <div id="userHelp" className="form-text text-secondary">¿Cómo te gustaría que te conozcan?</div>
    <p className="text-danger">{errors.username?.message}</p>
    </section>
    <section className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control forminputs" id="email" autoComplete="email" aria-describedby="emailHelp"{...register('email')}/>
    <p style={{color:"fusia"}}>{errors.email && errors.email.message}</p>
    <div id="emailHelp" className="form-text text-secondary">Tu información está a salvo con nosotros.</div>
    </section>
    <section className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control forminputs" id="password" placeholder="Establecer contraseña"{...register('password')}/>
    <p style={{color:"deeppink"}}>{errors.password && errors.password.message}</p>
    </section>
    <section className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control forminputs" id="confirmPassword" placeholder="Repite la misma contraseña"{...register('confirmPassword')}/>
    <p style={{color:"deeppink"}}>{errors.confirmPassword && errors.confirmPassword.message}</p>
    </section>
    <section className="mb-3 form-check">
    <input type="checkbox" className="form-check-input forminputs" id="check"{...register('check')}/>
    <label className="form-check-label" htmlFor="check">Acepto todas las condiciones.</label>
    <p style={{color:"deeppink"}}>{errors.check && errors.check.message}</p>
    </section>
    <button type="submit" className="btn boton-registrarme btn-primary">Registrarme</button>
    <br></br>
    <br></br>
    <Link className="texto-back" to='/'>Regresar</Link>
</form>
</div>
</>
  )
}

