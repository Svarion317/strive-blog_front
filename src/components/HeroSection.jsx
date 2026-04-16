import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreateArticle from "./CreateArticle";

function HeroSection() {
  return (
    <section className="hero-section py-5 py-md-6">
      <Container>
        <Row className="align-items-center g-4">
          <Col xs={12} md={8}>
            <h1 className="display-5 fw-bold mb-3">
              Racconti, idee e storie dal blog
            </h1>
            <p className="lead mb-0 text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              consequuntur alias delectus quod porro?
            </p>
          </Col>
          <Col xs={12} md={4}>
            <CreateArticle />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
