import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Github from "./GitHub";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../assets/about.png";
import Toolstack from "./Toolstack";
import "../../components/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        

        <Techstack />

        
        
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;