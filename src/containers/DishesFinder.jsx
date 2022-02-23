import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { getDishes } from "../utils/getData";
import { addToData } from "../store/slices/dishes";

import SimpleCard from "../components/SimpleCard";

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
    const dishesVegans = data.filter(dish => dish.vegan == true).length
    const dishesNotVegan = data.filter(dish => dish.vegan == false).length


    if (data.length >= 4) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot be added, the menu is full!'
      })
    } else if (data.some(el => el.id == dish.id)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It cannot be added, the dish is already on the menu!'
      })
    } else if (dish.vegan && dishesVegans >= 2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are already two vegan dishes on the menu!'
      })
    } else if (!dish.vegan && dishesNotVegan >= 2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There are already two non-vegan dishes on the menu!'
      })
    } else {
      dispatch(addToData(dish))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully added',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <Container>
      <h2 className="text-center text-muted">
        Search through thousands of recipes
      </h2>
      <InputGroup className="my-3">
        <FormControl
          placeholder="Enter a plate..."
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
          <div className="alert alert-primary text-center" role="alert">
            Loading...
          </div>
        }
        {dishes.length > 0 &&
          <p className="text-center text-muted">
            Select a dish and it will be added to the menu
          </p>
        }
        {dishes.length > 0 &&

          dishes.map(dish =>
            <div className="col-sm-6 col-md-4 col-lg-3" key={dish.id}>
              <SimpleCard dish={dish} verticalOrientation={true} clickCard={addToTheMenu} />
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default DishesFinder