import { Navbar, Nav, Container, Image } from "react-bootstrap";

import "./styles.css";
import Logo from "../../Images/logo.png";

const NavigationBar = () => {
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="me-5">
          <Image src={Logo} className="logo" alt=""/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="shadow-none"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
