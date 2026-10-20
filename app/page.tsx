import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 transition-colors dark:bg-background/80 dark:text-zinc-50">
      <Navbar />

      <main className="flex flex-1 flex-col w-full divide-1">
        <Hero />

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
