import axios from "axios";
import 'babel-polyfill'

const API = process.env.API
const API_KEY = process.env.API_KEY
const QUERY_PARAMS = {
  complexSearch: 'complexSearch',
  autocomplete: 'autocomplete',
}

export function getDishes(diet, amount) {
  const url_root = `${API}${QUERY_PARAMS.complexSearch}?apiKey=${API_KEY}`

  return axios.get(
    url_root,
    { diet: diet, number: amount }
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