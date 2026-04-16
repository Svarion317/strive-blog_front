import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarAuthPanel from './NavbarAuthPanel'

function BlogNavbar() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-2 py-md-3" sticky="top">
      <Container>
        <Navbar.Brand className="fw-bold m-0">Strive Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="blog-navbar-content" />
        <Navbar.Collapse id="blog-navbar-content" className="mt-3 mt-lg-0">
          <Nav className="ms-auto align-items-lg-center">
            <div className="auth-panel-wrapper">
              <NavbarAuthPanel />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BlogNavbar
