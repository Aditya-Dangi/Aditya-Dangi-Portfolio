import React from "react";
import {
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { profile } from "../../data/portfolio";
import { useClipboard } from "../../hooks/useClipboard";
import { Button, Card, Reveal, Tooltip, useToast } from "../ui";
import { GithubProfileCard } from "./GithubProfileCard";

const socials = [
  { label: "GitHub", href: profile.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FiLinkedin },
  {
    label: "Delhi, India",
    href: "https://www.google.com/maps/place/Delhi,+India",
    icon: FiMapPin,
  },
];

export function Contact() {
  const { copied, copy } = useClipboard();
  const { toast } = useToast();

  const copyEmail = async () => {
    const ok = await copy(profile.email);
    toast(
      ok
        ? { title: "Email copied", description: profile.email, tone: "success" }
        : {
            title: "Could not copy",
            description: "Your browser blocked clipboard access.",
            tone: "error",
          }
    );
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <Reveal direction="up">
        <Card padding="lg" className="contact__card" spotlight>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="contact__title">
            How do you reach me?
          </h2>
          <p className="contact__copy">
            I am open to software engineering opportunities where I can contribute
            to secure, scalable products and keep growing around strong engineering
            teams.
          </p>

          <div className="contact__actions">
            <Button
              as="a"
              variant="accent"
              size="lg"
              className="contact__email-btn"
              href={`mailto:${profile.email}`}
            >
              <FiMail aria-hidden="true" />
              {profile.email}
            </Button>

            <Tooltip label={copied ? "Copied" : "Copy email address"}>
              <Button
                variant="secondary"
                size="lg"
                iconOnly
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </Button>
            </Tooltip>

            <Button
              as="a"
              variant="secondary"
              size="lg"
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            >
              <FiPhone aria-hidden="true" />
              {profile.phone}
            </Button>
          </div>

          <ul className="contact__socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer">
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <GithubProfileCard profileUrl={profile.github} />
        </Card>
      </Reveal>
    </section>
  );
}

export default Contact;
