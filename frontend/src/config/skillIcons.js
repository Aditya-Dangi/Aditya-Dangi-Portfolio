import {
  SiAngular,
  SiAnthropic,
  SiCss3,
  SiDocker,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMysql,
  SiOpenai,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiSpringboot,
  SiSwagger,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { TbApi, TbBrandOauth, TbBug, TbCodeDots } from "react-icons/tb";
import { LuBrainCircuit, LuWorkflow } from "react-icons/lu";

/** Per-skill glyphs, keyed by the exact label used in the data layer. */
export const skillIcons = {
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  SQL: DiMsqlServer,
  "Spring Boot": SiSpringboot,
  "Spring Security": SiSpringboot,
  Hibernate: SiHibernate,
  JPA: LuWorkflow,
  "REST APIs": TbApi,
  JWT: TbBrandOauth,
  "Swagger/OpenAPI": SiSwagger,
  Angular: SiAngular,
  RxJS: SiAngular,
  "Responsive UI": TbCodeDots,
  "Component Architecture": LuWorkflow,
  HTML: SiHtml5,
  CSS: SiCss3,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Docker: SiDocker,
  Maven: SiOpenapiinitiative,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "IntelliJ IDEA": SiIntellijidea,
  "VS Code": SiVisualstudiocode,
  OOP: LuBrainCircuit,
  "Data Structures": LuBrainCircuit,
  Algorithms: TbCodeDots,
  Debugging: TbBug,
  Agile: LuWorkflow,
  SDLC: LuWorkflow,
  ChatGPT: SiOpenai,
  "Claude Code": SiAnthropic,
};

/** Fallback keeps every pill visually balanced, even for new skills. */
export const FallbackSkillIcon = TbCodeDots;

export default skillIcons;
