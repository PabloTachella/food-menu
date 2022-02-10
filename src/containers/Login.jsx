import React from "react";

// El formulario se deberá renderizar al ingresar a cualquier ruta si el usuario no está autenticado,
// conteniendo los campos:
// ● Email.
// ● Password.
// ● Botón de “Enviar”.
// Al hacer click en “Enviar”, se deberá validar que ambos campos no estén vacíos, y mostrar un mensaje
// al usuario si lo estuviesen. Caso contrario, se deberá realizar una petición POST a la siguiente url, con
// los campos email y password en el BODY.
// Los datos válidos para obtener un token son:
// ● Email: challenge@alkemy.org
// ● Password: react
// Se debe mostrar algún tipo de feedback al usuario mientras se está procesando la petición, no
// permitiendo que vuelva a accionar el botón de login hasta obtener una respuesta.
// En el caso de obtener un error de la API, se deberá mostrar una alerta (utilizando sweet alert), mientras
// que si es satisfactorio deberá redirigir al Home y almacenar el token obtenido en localStorage. Para
// realizar las validaciones no es necesario utilizar ninguna librería.

const Login = () => {
  return (
    <h2>Login</h2>
  )
}

export default Login