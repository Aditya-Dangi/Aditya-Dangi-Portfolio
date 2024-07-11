import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiNpm,
  SiOperagx,
  SiWindows,
  SiSpotify,
  SiApplemusic,
  SiYoutubemusic,
  SiAmazonmusic,
  SiBattledotnet,
  SiEpicgames,
  SiSteam,
  SiRiotgames,
  SiQbittorrent,
  SiAmazonprime,
  SiNetflix,
  SiYoutube,
  SiTwitch
} from "react-icons/si";

function Toolstack() {
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <h1 className="mb-4 mt-4" style={{ textAlign:"center", textTransform:"capitalize" }}><span className="purple">Technologies</span> i use </h1>
        <Col xs={4} md={2} className="tech-icons">
          <SiWindows />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiVisualstudiocode />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPostman />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiNpm />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiOperagx />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <h1 className="mb-4 mt-4" style={{ textAlign:"center", textTransform:"capitalize" }}>Apart from <span className="purple">coding</span></h1>
        <Col xs={4} md={2} className="tech-icons">
          <SiSpotify />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiApplemusic />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiYoutubemusic />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiAmazonmusic />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiNetflix />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiAmazonprime />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiYoutube />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiTwitch />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiBattledotnet />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiEpicgames />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiSteam />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiRiotgames />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiQbittorrent />
        </Col>
      </Row>
    </div>
  );
}

export default Toolstack;
