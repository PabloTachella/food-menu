import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';

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

const Login = ({ handleSubmit, authenticating }) => {

  const valuesRequiredByFormik = {
    initialValues: { email: '', password: '' },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    onSubmit: ({ email, password }, { resetForm }) => {
      handleSubmit(email, password, resetForm)
    }
  }

  return (
    <Container className="mt-5">
      <h4 className="text-center">
        Welcome, in Food Menu you can create a menu of dishes selecting from thousands of recipes
      </h4>
      <p className="text-center text-muted mb-5">login to start</p>
      <Formik {...valuesRequiredByFormik}>
        {({ handleSubmit, isSubmitting }) => (
          <Form className="col-md-6 mx-md-auto" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <div className="row ms-0 me-0" >
                <Field type="email" name="email" placeholder="challenge@alkemy.org" />
              </div>
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="row ms-0 me-0">
                <Field type="password" name="password" placeholder="react" />
              </div>
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </Form.Group>
            {authenticating &&
              <div className="alert alert-primary text-center" role="alert">
                authenticating, please wait...
              </div>
            }
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <p className="text-center text-muted mt-5">Obtain an authentication token by entering the following credentials</p>
      <p className="text-center text-muted my-1">email: challenge@alkemy.org</p>
      <p className="text-center text-muted my-1">password: react</p>
    </Container>
  )
}

export default Login