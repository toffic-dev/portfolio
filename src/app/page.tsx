import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatIBuild } from "@/components/WhatIBuild";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Lab } from "@/components/Lab";
import { Experience } from "@/components/Experience";
import { GitHub } from "@/components/GitHub";
import { Certificates } from "@/components/Certificates";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";

/**
 * The single-page portfolio.
 *
 * Sections are ordered to answer "who / what / proof / how to reach them" in
 * that order, and each one is an independent component reading from `src/data`.
 */
export default function HomePage() {
  return (
    <>
      {/* 00 */} <Hero />
      {/* 01 */} <About />
      {/* 01.5 */} <WhatIBuild />
      {/* 02 */} <Skills />
      {/* 03 */} <Projects />
      {/* 03.5 */} <Lab />
      {/* 04 */} <Experience />
      {/* 04.5 */} <GitHub />
      {/* 05 */} <Certificates />
      {/* 05.5 */} <Resume />
      {/* 06 */} <Contact />
    </>
  );
}