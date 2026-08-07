import React from "react";
import { AppShell } from "./layout/AppShell";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import "./sections/sections.css";

/**
 * The portfolio page: application chrome from <AppShell>, content from the
 * section components. Section order here must match `config/navigation.js`,
 * which drives the rail, the drawer, the palette and the scroll spy.
 */
function Portfolio() {
  return (
    <AppShell footer={<Footer />}>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </AppShell>
  );
}

export default Portfolio;
