import React from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/Dish.css"

//style={{ width: '100%' }}
const Dish = ({ title, image, nutrition, id, deleteDish }) => {
  const NUTRIENTS = ['Calories', 'Fat', 'Carbohydrates', 'Protein']
  const allNutrients = nutrition.nutrients
  const allIngredients = nutrition.ingredients
  const nutrientsToShow = []
  const ingredientsToShow = []

  NUTRIENTS.map(nameNutrient =>
    nutrientsToShow.push(
      allNutrients.find(nutrient => nutrient.name == nameNutrient))
  )

  allIngredients.map(ingredientObj => ingredientsToShow.push(ingredientObj.name))

  return (
    <Card className="my-md-3 my-lg-4">
      <div className="delete-container" onClick={() => deleteDish(id)}>
        <span className="position-absolute top-50 start-50 translate-middle text-muted fs-5">x</span>
      </div>
      <div className="row g-0">
        <div className="col-sm-4">
          <Card.Img style={{ height: '100%' }} src={image} />
        </div>
        <div className="col-sm-8">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <div className="row">
              {nutrientsToShow.map(({ name, amount, unit }, index) =>
                <div className="col-3" key={index}>
                  <Card.Subtitle className="text-muted mt-4">{name}</Card.Subtitle>
                  <Card.Text>{amount} {unit}</Card.Text>
                </div>
              )}
            </div>
            <Card.Subtitle className="text-muted mt-4">Ingredients</Card.Subtitle>
            <Card.Text>{ingredientsToShow.toString().replaceAll(',', ' / ')}</Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  )
}

export default Dish