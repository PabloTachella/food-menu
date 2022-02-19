import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { getDishes } from "../utils/getData";
import { addToData } from "../store/slices/dishes";

import Dish from "../components/Dish";

// Para agregar un plato al menú, se deberá visualizar un formulario que realice una petición GET al
// endpoint de búsqueda y muestre los resultados disponibles en un grid, utilizando el componente de
// ítem del punto anterior.
// El formulario deberá buscar únicamente si hay más de 2 caracteres en el filtro, caso contrario no debe
// mostrar nada. La validación deberá realizarse utilizando la librería Formik.

const DishesFinder = () => { // Buscador de Platos
  const [input, setInput] = useState('')
  const [dishes, setDishes] = useState([]) // Data a renderizar
  const [timerId, setTimerId] = useState() // Para cancelar la ejecucion de las busquedas 
  // mientras se siga tipeando
  const [loading, setLoading] = useState(false) // para mostrar un loading mientras se realiza la peticion

  const { data } = useSelector(state => state.dishes)
  const dispatch = useDispatch()

  const performSearch = (query, numberOfDishes) => {
    if (query.length >= 2) {
      setLoading(true)
      const addRecipeNutrition = true

      getDishes({ numberOfDishes, addRecipeNutrition, query })
        .then(res => {
          const dishes = res.data.results
          setDishes(currentDishes_ => dishes)
          setLoading(false)
        })
        .catch(error => new Error(error))
    } else {
      setDishes(currentDishes_ => [])
    }
  }

  const handleChange = ev => {
    let newTimerId
    const value = ev.currentTarget.value

    clearTimeout(timerId) // cancelo la busqueda si no han pasado 600ms y se volvio a tipear
    setInput(value)

    newTimerId = setTimeout(() => {
      performSearch(value, 4)
    }, 600)
    setTimerId(newTimerId)
  }

  const addToTheMenu = dish => {
    if (data.some(el => el.id == dish.id )) {
      console.log('No se puede agregar, el plato ya esta en la carta')
    } else if (data.length >= 4) {
      console.log('no se pueden agregar más platos')
    } else {
      dispatch(addToData(dish))
    } 
  }

  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter a plate"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={handleChange}
        />
        <Button variant="outline-secondary"
          id="button-addon2"
          onClick={() => performSearch(input, 20)}
        >Search
        </Button>
      </InputGroup>
      <div className="row g-4">
        {loading &&
          <span className="text-center">...Cargando</span>
        }
        {dishes.length > 0 &&
          dishes.map(dish =>
            <Dish key={dish.id} dish={dish} showInSearchSection={true} clickCard={addToTheMenu} />
          )
        }
      </div>
    </Container>
  )
}

export default DishesFinder