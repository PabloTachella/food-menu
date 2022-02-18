import React from "react";
import { Card } from "react-bootstrap";

const AveragesCard = ({ title, value }) => {
  return (
    <Card className="my-md-3 my-lg-4">
      <Card.Header>{title}</Card.Header>
      <Card.Body>{value}</Card.Body>
    </Card>
  )
}

export default AveragesCard