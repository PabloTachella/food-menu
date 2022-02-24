import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="sm" className="mb-4">
      <Container>
        <Link className="navbar-brand" to="home">Food Menu</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* La etiqueta original usando los componentes de Bootstrap sería
                <Nav.Link href="home">Dishes</Nav.Link> 
                Pero tiene el problema de recargar la página al momento de redireccionar.
                Lo solucioné usando 'Link' de react-router-dom pero se pierden los estilos,
                por lo que le apliqué a <Link> la class que <Nav.Link /> tiene incorporada "nav-link".
              */}
            <Link className="nav-link" to="home" >Dishes</Link>
            <Link className="nav-link" to="dish-detail" >Details</Link>
            <Link className="nav-link" to="dishes-finder">Search Dishes</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header