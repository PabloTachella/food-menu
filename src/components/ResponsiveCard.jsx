import React from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/ResponsiveCard.css"

const LandscapeCard = ({ dish, deleteDish, clickCard }) => {
  const { title, image, nutrition, id, vegan } = dish

  let NUTRIENTS = ['Calories', 'Fat', 'Carbohydrates', 'Protein']
  const allNutrients = nutrition.nutrients
  const allIngredients = nutrition.ingredients
  const nutrientsToShow = []
  const ingredientsToShow = []
  const colorTitleStyle = vegan ? { color: 'green' } : {}
  const colorContainerStyle = vegan ? { borderColor: 'green', cursor: 'pointer' } : { cursor: 'pointer' }

  NUTRIENTS.map(nameNutrient =>
    nutrientsToShow.push(
      allNutrients.find(nutrient => nutrient.name == nameNutrient))
  )

  allIngredients.map(ingredientObj => ingredientsToShow.push(ingredientObj.name))

  return (
    <Card
      className="text-center text-lg-start"
      onClick={() => clickCard(dish)}
      style={colorContainerStyle}
    >
      <div className="delete-container" onClick={() => deleteDish(id)}>
        <span className="position-absolute top-50 start-50 translate-middle text-muted fs-5">x</span>
      </div>
      <div className="row g-0">
        <div className="col-lg-4">
          <Card.Img style={{ height: '100%' }} src={image} />
        </div>
        <div className="col-lg-8">
          <Card.Body>
            <Card.Title style={colorTitleStyle}>{title}</Card.Title>
            <div className="row">
              {nutrientsToShow.map(({ name, amount, unit }, index) =>
                <div className="col-6 col-lg-3" key={index}>
                  <Card.Subtitle className="text-muted mt-4">{name}</Card.Subtitle>
                  <Card.Text>{amount} {unit}</Card.Text>
                </div>
              )}
            </div>
            <Card.Subtitle className="text-muted mt-4 exclude-on-small-screen">Ingredients</Card.Subtitle>
            <Card.Text className="exclude-on-small-screen">{ingredientsToShow.toString().replaceAll(',', ' / ')}</Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  )
}

export default LandscapeCard