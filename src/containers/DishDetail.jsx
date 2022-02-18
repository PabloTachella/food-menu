import React from "react";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";

// Al hacer click en un plato del menú, se mostrarán los detalles de los campos acumulados y
// promediados en el menú.

const DishDetail = () => {
  const { data } = useSelector(state => state.dishes)

  return (
    <Container>
      <Table responsive="sm" className="my-4">
        <thead>
          <tr>
            <th>Dish</th>
            <th>Preparation time</th>
            <th>Healt Score</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ title, readyInMinutes, healthScore, pricePerServing }) =>
            <tr>
              <td>{title}</td>
              <td>{readyInMinutes} min</td>
              <td>{healthScore}</td>
              <td>$ {pricePerServing}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default DishDetail