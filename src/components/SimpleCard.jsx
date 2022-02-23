import React from "react";
import { Card } from "react-bootstrap";

const VerticalCard = ({ dish, clickCard }) => {
  const { title, image, nutrition, id, vegan } = dish
  let NUTRIENTS = ['Calories', 'Protein']
  const allNutrients = nutrition.nutrients
  const nutrientsToShow = []
  const colorContainerStyle = vegan ? { borderColor: 'green', cursor: 'pointer' } : { cursor: 'pointer' }
  const colorTitleStyle = vegan ? { color: 'green' } : {}

  NUTRIENTS.map(nameNutrient =>
    nutrientsToShow.push(
      allNutrients.find(nutrient => nutrient.name == nameNutrient))
  )

  return (
    <Card
      // text-lg-start
      className="text-center"
      onClick={() => clickCard(dish)}
      style={colorContainerStyle}
    >
      <div className="row g-0">
        {/* className="col-lg-4" */}
        <div>
          <Card.Img style={{ height: '100%' }} src={image} />
        </div>
        {/* className="col-lg-8" */}
        <div>
          <Card.Body>
            <Card.Title style={colorTitleStyle}>{title}</Card.Title>
            <div className="row">
              {nutrientsToShow.map(({ name, amount, unit }, index) =>
                // col-lg-3
                <div className="col-6" key={index}>
                  <Card.Subtitle className="text-muted mt-4">{name}</Card.Subtitle>
                  <Card.Text>{amount} {unit}</Card.Text>
                </div>
              )}
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  )
}

export default VerticalCard