import CardContent from "../card-content";
import SectionHeader from "../section-header";

const About = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHeader
        eyebrow="01-about"
        title="Seven years of building for the web, and still curious."
      />
      <div className="mt-12 grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <p className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          I&apos;m a software engineer with around seven years of experience building web
          applications across different industries, including AI, e-commerce, retail, and
          public-sector projects. Frontend development is my strongest area. I enjoy building
          intuitive interfaces, solving complex UI problems, improving user experiences, and
          creating maintainable applications. I&apos;ve also worked with backend technologies such
          as Python, FastAPI, Node.js, and Express. Backend development is an area I&apos;m actively
          exploring and improving through continuous learning and hands-on work. I&apos;m interested
          in building useful products, understanding how things work under the hood, and using new
          tools, including AI, to become a better engineer.
        </p>
        <CardContent>
          <p className="eyebrow">What i care about</p>
          <ul className="mt-5 space-y-3.5">
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">01</span>
              <span>Building useful products</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">02</span>
              <span>User experience and frontend architecture</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">03</span>
              <span>Continuous learning</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">04</span>
              <span>Problem-solving</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">05</span>
              <span>Collaboration and helping teammates</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-primary pt-1">06</span>
              <span>Exploring AI and new ways to build software</span>
            </li>
          </ul>
        </CardContent>
      </div>
    </div>
  );
};

export default About;
