import React from "react";
import { FiDownload, FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import { profile, highlights } from "../../data/portfolio";
import { useParallax } from "../../hooks/useParallax";
import {
  Badge,
  Button,
  Card,
  Counter,
  Kbd,
  Magnetic,
  Reveal,
  SplitText,
} from "../ui";
import { HeroField } from "./HeroField";

/**
 * Landing screen. This is the section that has to land in the first three
 * seconds: a word-staggered headline, a floating geometric field and a
 * cursor-reactive spotlight card, all sitting on top of the shell's global
 * cursor glow and aurora backdrop.
 */
export function Hero() {
  const panelParallax = useParallax(-0.06);
  const fieldParallax = useParallax(0.1);

  return (
    <section className="hero" id="overview" aria-labelledby="overview-title">
      <div ref={fieldParallax} className="hero__field-layer">
        <HeroField />
      </div>

      <div className="hero__copy">
        <Reveal direction="up">
          <Badge tone="accent" dot className="hero__status">
            Software Engineer @ Newgen Software
          </Badge>
        </Reveal>

        <h1 id="overview-title" className="hero__headline">
          <SplitText as="span" text={profile.headline} />
        </h1>

        <Reveal direction="up" delay={220}>
          <p className="hero__summary">{profile.summary}</p>
        </Reveal>

        <Reveal direction="up" delay={280} className="hero__actions">
          <Magnetic strength={0.4}>
            <Button as="a" variant="accent" size="lg" href={`mailto:${profile.email}`}>
              <FiMail aria-hidden="true" />
              Contact me
            </Button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Button
              as="a"
              variant="secondary"
              size="lg"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink aria-hidden="true" />
              View resume
            </Button>
          </Magnetic>
          <Button
            as="a"
            variant="ghost"
            size="lg"
            href={profile.resumeDownload}
            download={profile.resumeDownloadName}
            type="application/pdf"
          >
            <FiDownload aria-hidden="true" />
            Download PDF
          </Button>
        </Reveal>

        <Reveal direction="up" delay={340} className="hero__meta">
          <span className="hero__meta-item">
            <FiMapPin aria-hidden="true" />
            {profile.location}
          </span>
          <span className="hero__meta-item hero__meta-item--hint">
            Press <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd> to jump anywhere
          </span>
        </Reveal>
      </div>

      <Reveal direction="scale" delay={200} className="hero__panel">
        <div ref={panelParallax}>
          <Card variant="glass" padding="sm" className="hero__card" spotlight>
            <div className="hero__identity">
              <p className="eyebrow">Recruiter snapshot</p>
              <h2 className="hero__identity-title">Java + Spring Boot + Angular</h2>
              <p className="hero__identity-copy">
                Enterprise banking experience, secure API workflows, Angular
                modernization, and deployed frontend projects.
              </p>
            </div>

            <dl className="metrics">
              {highlights.map((item, index) => (
                <Card
                  as="div"
                  variant="inset"
                  padding="sm"
                  className="metric"
                  key={item.label}
                  style={{ "--metric-index": index }}
                >
                  <dt className="metric__value">
                    <Counter value={item.value} />
                  </dt>
                  <dd className="metric__label">{item.label}</dd>
                </Card>
              ))}
            </dl>
          </Card>
        </div>
      </Reveal>

      <span className="hero__scroll-cue" aria-hidden="true">
        <span className="hero__scroll-cue-line" />
        Scroll
      </span>
    </section>
  );
}

export default Hero;
