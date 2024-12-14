import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Import custom styles

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark navbar-dark shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-primary">
          Title<span className="text-warning">Verification</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Use Link components for navigation */}
            <Nav.Link as={Link} to="/about" className="text-light fw-semibold">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/instructions" className="text-light fw-semibold">
              Instructions
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics" className="text-light fw-semibold">
              Statistics
            </Nav.Link>
          </Nav>
          <Nav>
            <Link to="/login">
              <Button variant="outline-primary" className="me-2">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">
                Signup
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
