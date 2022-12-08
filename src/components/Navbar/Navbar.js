import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./nav.css";
function Navbars() {
  let bool = localStorage.getItem("user") ? true : false;
  let signout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {bool ? (
              <>
                <Link to="/add-post" className="nav-link">
                  Add Post
                </Link>
                <Link
                  to={`/profile/${
                    bool ? JSON.parse(localStorage.getItem("user")).id : ""
                  }`}
                  className="nav-link"
                >
                  Profile
                </Link>
                <NavDropdown
                  title={
                    bool ? JSON.parse(localStorage.getItem("user")).name : ""
                  }
                  id="basic-nav-dropdown"
                >
                  <Link
                    onClick={signout}
                    className="dropdown-item"
                    to="/signout"
                  >
                    Signout
                  </Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/signin" className="nav-link">
                  Signin
                </Link>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
