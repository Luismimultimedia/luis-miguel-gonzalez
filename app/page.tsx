import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import SectionContainer from "@/components/section-container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 transition-colors dark:bg-background/80 dark:text-zinc-50">
      <Navbar />

      <main className="flex flex-1 flex-col w-full divide-1">
        <Hero />
        <SectionContainer>
          <About />
        </SectionContainer>
      </main>
    </div>
  );
}
