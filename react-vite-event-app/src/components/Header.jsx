import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Header() {
  const { currentUser, isAuthenticated, logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to={isAuthenticated ? '/dashboard' : '/login'}>
          Event Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-nav" />
        <Navbar.Collapse id="app-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-event">
                  Add Event
                </Nav.Link>
                <Nav.Link as={NavLink} to="/help">
                  Help
                </Nav.Link>
              </>
            )}
          </Nav>
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <>
                <span className="text-white-50 small">Welcome, {currentUser?.name}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={NavLink} to="/login" variant="outline-light" size="sm">
                  Login
                </Button>
                <Button as={NavLink} to="/register" variant="light" size="sm">
                  Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
