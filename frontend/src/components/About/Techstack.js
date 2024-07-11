import React from "react";
import { Row, Col } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
  DiHtml5, 
  DiBootstrap, 
  DiJqueryLogo,
  DiMysql,
  DiCss3
} from "react-icons/di";
import { 
  SiExpress
} from "react-icons/si";

function Techstack() {
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <h1  className=" mt-4 mb-4" style={{ textAlign:"center", textTransform:"capitalize" }}><span className="purple" title="Professional">Professional</span> Skillset</h1>
        <Col xs={4} md={2} className="tech-icons">
          <DiJava />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <CgCPlusPlus />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiPython />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <DiHtml5 />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiCss3 />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiJavascript1 />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiBootstrap />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiReact />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiJqueryLogo />
        </Col>
      </Row>
      
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <DiNodejs />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiExpress />
        </Col>
      </Row>
      
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <DiMysql />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiMongodb />
        </Col>
      </Row>
      
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <DiGit />
        </Col>
      </Row>
    </div>
  );
}

export default Techstack;
