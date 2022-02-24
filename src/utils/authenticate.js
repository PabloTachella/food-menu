import axios from "axios";

const AUTHENTICATION_URL = 'http://challenge-react.alkemy.org/'

export function authenticateData(email, password) {
  return new Promise((resolve, reject) => {
    // Simulo la respuesta del servidor del challenge
    if(email == 'challenge@alkemy.org' && password == 'react') {
      resolve({data: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"}})
    } else {
      reject('Invalid credentials')
    }
  })
}

// Reemplazar autenticateData por la siguiente funcion para una autenticacion en la url del challenge
// Esto solo funcionará en el entorno local debido a que una vez desplegado el sitio, los navegadores
// bloquearan el contenido obtenido mediante HTTP sin cifrar
// error: Se ha bloqueado la carga del contenido activo mixto "http://challenge-react.alkemy.org/"

// export function authenticateData(email, password) {
//   return axios
//     .post(
//       AUTHENTICATION_URL,
//       { email: email, password: password }
//     )
// }
