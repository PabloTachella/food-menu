import React from "react";
import { searchDishes } from "../utils/getData";

// Para agregar un plato al menú, se deberá visualizar un formulario que realice una petición GET al
// endpoint de búsqueda y muestre los resultados disponibles en un grid, utilizando el componente de
// ítem del punto anterior.
// El formulario deberá buscar únicamente si hay más de 2 caracteres en el filtro, caso contrario no debe
// mostrar nada. La validación deberá realizarse utilizando la librería Formik.

const DishesFinder = () => {
  return (
    <h2>Dishes Finder</h2>
  )
}

export default DishesFinder