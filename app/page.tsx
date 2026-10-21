import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 transition-colors dark:bg-background/80 dark:text-zinc-50">
      <Navbar />

      <main className="flex flex-1 flex-col w-full divide-1">
        <Hero />

        <section id="about" className="mx-auto max-w-5x px-5 py-14 md:px-0 mt-20 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold tracking-tight">Beyond code</h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Outside software development, I enjoy playing tennis, learning new things, and exploring
            different ideas. This is my space to share what I build, what I learn, and what
            interests me.
          </p>
        </section>
      </main>
    </div>
  );
}
