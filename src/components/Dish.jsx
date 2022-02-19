import React from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/Dish.css"

//style={{ width: '100%' }}
const Dish = ({ dish, deleteDish, showInSearchSection, clickCard }) => {
  const { title, image, nutrition, id, vegan } = dish
  let NUTRIENTS = []
  showInSearchSection ?
    NUTRIENTS = ['Calories', 'Protein'] :
    NUTRIENTS = ['Calories', 'Fat', 'Carbohydrates', 'Protein']
  const allNutrients = nutrition.nutrients
  const allIngredients = nutrition.ingredients
  const nutrientsToShow = []
  const ingredientsToShow = []

  NUTRIENTS.map(nameNutrient =>
    nutrientsToShow.push(
      allNutrients.find(nutrient => nutrient.name == nameNutrient))
  )

  allIngredients.map(ingredientObj => ingredientsToShow.push(ingredientObj.name))

  const colOfNutrients = showInSearchSection ? "col-6" : "col-3"
  const colContainer = showInSearchSection ? "col-sm-6 col-md-3" : "col"
  const colorContainerStyle = vegan ? {borderColor: 'green'} : {}
  const colorTitleStyle = vegan ? {color: 'green'} : {}

  const bodyCard =
    <Card.Body>
      <Card.Title style={colorTitleStyle}>{title}</Card.Title>
      <div className="row">
        {nutrientsToShow.map(({ name, amount, unit }, index) =>
          <div className={colOfNutrients} key={index}>
            <Card.Subtitle className="text-muted mt-4">{name}</Card.Subtitle>
            <Card.Text>{amount} {unit}</Card.Text>
          </div>
        )}
      </div>
      {!showInSearchSection &&
        <>
          <Card.Subtitle className="text-muted mt-4">Ingredients</Card.Subtitle>
          <Card.Text>{ingredientsToShow.toString().replaceAll(',', ' / ')}</Card.Text>
        </>
      }
    </Card.Body>

  return (
    <div className={colContainer}>
      <Card className="my-md-3 my-lg-4"
        onClick={() => clickCard(dish)}
        style={colorContainerStyle}
      >
        {!showInSearchSection &&
          <>
            <div className="delete-container" onClick={() => deleteDish(id)}>
              <span className="position-absolute top-50 start-50 translate-middle text-muted fs-5">x</span>
            </div>
            <div className="row g-0">
              <div className="col-sm-4">
                <Card.Img style={{ height: '100%' }} src={image} />
              </div>
              <div className="col-sm-8">
                {bodyCard}
              </div>
            </div>
          </>
        }
        {showInSearchSection &&
          <>
            <Card.Img src={image} />
            {bodyCard}
          </>
        }
      </Card>
    </div>
  )
}

export default Dish