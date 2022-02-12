import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { authenticateData } from "../utils/authenticate";
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

const Login = () => {

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
    onSubmit: ({ email, password }) => {
      handleSubmit(email, password)
    }
  }

  const email = 'challenge@alkemy.org'
  const password = 'react'

  const handleSubmit = (email, password) => {
    authenticateData(email, password)
      .then(token => {
        localStorage.setItem('token', token.data.token)
      })
      .catch(error => {
        new Error(error)
        console.log('no resuelto')
      })
  }


  return (
    <Container className="mt-5">
      <Formik {...valuesRequiredByFormik}>
        {({ handleSubmit, isSubmitting }) => (
          <Form className="col-md-6 mx-md-auto" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <div className="row ms-0 me-0" >
                <Field type="email" name="email" placeholder="Enter email" />
              </div>
              <ErrorMessage name="email" component="div" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="row ms-0 me-0">
                <Field type="password" name="password" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Login