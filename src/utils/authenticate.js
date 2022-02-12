import axios from "axios";

const AUTHENTICATION_URL = 'http://challenge-react.alkemy.org/'

export function authenticateData(email, password) {
  return axios
    .post(
      AUTHENTICATION_URL,
      { email: email, password: password }
    )
}

// export async function authenticateData(email, password) {
//   try {
//     const token = await axios
//       .post(
//         AUTHENTICATION_URL,
//         { email: email, password: password }
//       ).then(res => res.data.token)
//     return token;
//   } catch (error) {
//     new Error(error)
//     return ''
//   }
// }