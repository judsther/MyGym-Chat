import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Campo obligatorio"),
  email: yup
    .string()
    .required("Campo obligatorio")
    .email("Correo inválido. Ejemplo: correo@dominio.com"),
  password: yup
    .string()
    .required("Debes escribir una contraseña")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
  check: yup
    .boolean()
    .oneOf([true], "Acepta las condiciones para registrarte")
    .required("Acepta las condiciones para registrarte"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Campo obligatorio")
    .email("Correo inválido. Ejemplo: correo@dominio.com"),
  password: yup
    .string()
    .required("Debes escribir una contraseña")
    .min(8, "Contraseña incorrecta"),
});
