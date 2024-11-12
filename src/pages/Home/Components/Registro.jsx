import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./Auth/Auth";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../../services/Firebase/firebase-config";
import "./Registro.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../../context/UserDataContext";
import { ProfilePicture } from "../../Welcome/components/ProfilePicture";
import logoMGC from "/src/assets/images/logoMGC.png";

export const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
 const { setData } = useContext(UserContext);

  const onSubmitForm = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          displayName: data.username,
          username: data.username.toString(),
          email: data.email,
          createdAt: serverTimestamp(),
        });

        setData({
          ...user,
          username: data.username,
          displayName: data.username,
          profilePicture: ProfilePicture, 
        });
        await signOut(auth);

        navigate("/IniciarSesion");
      })
      .catch((error) => {
        alert("Error al actualizar el perfil:", error.message);
      });
  };

  return (
    <>
      <div className="row text-center px-3 mt-1 d-flex align-items-center justify-content-center">
      <img src={logoMGC} alt="Logo" className="imgform d-inline-block m-3"/>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <section className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              className="form-control forminputs"
              id="username"
              autoComplete="username"
              aria-describedby="userlHelp"
              {...register("username")}
            />
            <div id="userHelp" className="form-text text-secondary">
              ¿Cómo te gustaría que te conozcan?
            </div>
            <p className="text-danger">{errors.username?.message}</p>
          </section>
          <section className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control forminputs"
              id="email"
              autoComplete="email"
              aria-describedby="emailHelp"
              {...register("email")}
            />
            <p style={{ color: "fusia" }}>
              {errors.email && errors.email.message}
            </p>
            <div id="emailHelp" className="form-text text-secondary">
              Tu información está a salvo con nosotros.
            </div>
          </section>
          <section className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control forminputs"
              id="password"
              placeholder="Establecer contraseña"
              {...register("password")}
            />
            <p style={{ color: "deeppink" }}>
              {errors.password && errors.password.message}
            </p>
          </section>
          <section className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control forminputs"
              id="confirmPassword"
              placeholder="Repite la misma contraseña"
              {...register("confirmPassword")}
            />
            <p style={{ color: "deeppink" }}>
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </section>
          <section className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input forminputs"
              id="check"
              {...register("check")}
            />
            <label className="form-check-label" htmlFor="check">
              Acepto todas las condiciones.
            </label>
            <p style={{ color: "deeppink" }}>
              {errors.check && errors.check.message}
            </p>
          </section>
          <button type="submit" className="btn boton-registrarme btn-primary">
            Registrarme
          </button>
        </form>
     
          <Link className="texto-back my-5" to="/">
            Regresar
          </Link>
      </div>
    </>
  );
};
