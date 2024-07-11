import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body style={{backgroundColor:"black"}}>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello! I'm Aditya Singh Dangi, a passionate and dedicated student pursuing my BTech in IT at Bhagwan Parshuram Institute of Technology. I have a strong interest in web development and software engineering, with proficiency in technologies like HTML, CSS, JavaScript, ReactJS, NodeJS, and more. I've actively worked on various projects, from creating interactive web applications to exploring AI technologies during my internship. 
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Listening to Music
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(105, 105, 105)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Aditya Dangi</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;