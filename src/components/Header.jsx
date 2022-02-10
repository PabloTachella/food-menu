import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand href="home">Food Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="home">Dishes</Nav.Link>
            <Nav.Link href="dish-detail">Details</Nav.Link>
            <Nav.Link href="dishes-finder">Search Dishes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header