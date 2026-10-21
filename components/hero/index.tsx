import Image from "next/image";
import TechGraph from "../tech-graph";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto max-w-5x px-5 py-14 md:px-0 md:py-20 grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-20 md:gap-0">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
          <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            <span className="block">Luis Miguel</span>
            <span className="block text-primary">Gonzalez</span>
          </h1>
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted shadow-soft sm:h-20 sm:w-20 md:h-28 md:w-28">
            <Image
              src="/portrait-profile.png"
              alt="Portrait of Luis Miguel Gonzalez"
              width={780}
              height={780}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="mt-8 max-w-lg space-y-3 text-lg leading-relaxed text-muted-foreground">
          <p className="eyebrow mt-4">Software Engineer · 7+ years building for the web</p>
          <p className="">
            I build thoughtful digital experiences, mostly on the frontend. I turn complex problems
            into intuitive, reliable web applications. Always learning, exploring AI, and growing
            into a stronger full-stack engineer.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap item-center gap-3">
          <Link
            href="#about"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 py-2 h-11 px-5 shadow-none active"
          >
            Explore my work
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 h-11 px-5 shadow-none active"
          >
            Let&apos;s connect
          </Link>
        </div>
      </div>
      <div aria-label="Technology stack" className="mx-auto w-full max-w-[600px]">
        <TechGraph />
      </div>
    </section>
  );
};

export default Hero;
