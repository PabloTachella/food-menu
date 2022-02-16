import React from "react";
import { Card } from "react-bootstrap";

//style={{ width: '100%' }}
const Dish = ({ title, image, imageType }) => {
  return (
    <Card > 
      <div className="row g-0">
        <div className="col-sm-4">
          <Card.Img src={image} />
        </div>
        <div className="col-sm-8">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{imageType}</Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
  )
}

export default Dish