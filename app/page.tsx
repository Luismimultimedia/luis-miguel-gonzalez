import Navbar from "@/components/navbar";

const technologies = ["React", "Next.js", "TypeScript", "Vue.js", "Python", "FastAPI"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 transition-colors dark:bg-background/80 dark:text-zinc-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 sm:px-10 sm:py-28">
        <section className="grid flex-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Software Engineer
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Hi, I&apos;m Luis Miguel.
              <span className="mt-2 block text-zinc-500 dark:text-zinc-400">
                I build digital experiences.
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              I&apos;m a software engineer focused on frontend development, building useful
              products, and exploring how AI can improve the way we create software.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#about"
                className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                More about me
              </a>

              <a
                href="#technologies"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:border-blue-600 dark:border-zinc-700"
              >
                My technologies
              </a>
            </div>
          </div>

          <div className="flex min-h-72 flex-col justify-center rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                LMG
              </div>

              <div>
                <p className="font-medium">My tech stack</p>
                <p className="text-sm text-zinc-500">Tools I use and explore</p>
              </div>
            </div>

            <div id="technologies" className="flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-5 dark:border-zinc-800">
              <p className="text-sm text-zinc-500">Currently learning</p>
              <p className="mt-1 font-medium">AI Engineering &amp; System Design</p>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 border-t border-zinc-200 py-10 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight">Beyond code</h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
            Outside software development, I enjoy playing tennis, learning new things, and exploring
            different ideas. This is my space to share what I build, what I learn, and what
            interests me.
          </p>
        </section>
      </main>
    </div>
  );
}
