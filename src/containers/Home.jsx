import React from "react";
import { Container } from "react-bootstrap";

import Dish from '../components/Dish'

// El Home de la aplicación mostrará los platos del menú en un listado. Cada ítem (el cuál debe ser un
//   componente separado) del listado contendrá:
//   ● Nombre del plato.
//   ● Imagen.
//   ● Características del plato.
//   ● Acciones para ver el detalle o eliminarlo del menú.

// En la pantalla de Home se deberá mostrar, además de los platos que conforman el menú:
// ● Acumulativo de precio del menú.
// ● Promedio de tiempo de preparación entre todos los platos.
// ● Promedio de Healt Score entre todos los platos.
// ● El menú debe tener 4 platos. Debe haber 2 veganos y 2 que no lo sean. Esto debe
// validarse al intentar agregar un nuevo plato.
// ● Se deberá poder eliminar un plato del menú, lo que generará nuevamente los promedios
// y acumulativos (los mismos deben estar almacenados en el estado del componente
// utilizando Hooks)

const el = {
  id : 1,
  title: 'Alto Guiso',
  img: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
  description: 'Con 15 pe podés hacer alto guiso'
}

const Home = () => {
  return (
    <Container>
      <div className="row">
        <div className="col-md-8">
          <Dish key={el.id} {...el} />
        </div>
        <div className="col-md-4"></div>
      </div>
    </Container>
  )
}

export default Home