import axios from "axios";
import 'babel-polyfill'

const API = process.env.API
const API_KEY = process.env.API_KEY
const QUERY_PARAMS = {
  complexSearch: 'complexSearch',
  autocomplete: 'autocomplete',
}

export function getDishes(diet, amount = 1, details = false) {
  const url_root = `${API}${QUERY_PARAMS.complexSearch}?apiKey=${API_KEY}`

  return axios.get(
    `${url_root}&diet=${diet}&number=${amount}&addRecipeNutrition=${details}`
    // Si hacia la consulta de la siguiente forma
    // url_root ,{ diet: diet, number: amount }
    // Realizaba {amount} cantidad de consultas con 10 resultados cada una, revisar comportamiento.
  )
}

export async function searchDishes(query = '') {
  try {
    const response = await axios.get(
      `${API}${QUERY_PARAMS.autocomplete}?apiKey=${API_KEY}&query=${query}`
    )
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}