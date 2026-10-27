import ContactForm from "../contact-form";
import SectionHeader from "../section-header";

const Contact = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHeader eyebrow="02-contact" title="Have something intereseting in mind?" />
      <div className="mt-12 grid gap-14 md:grid-cols-[1fr_1.4fr]">
        <p className="text-lg leading-relaxed text-muted-foreground">
          I&apos;m always open to meeting interesting people, discussing ideas, and exploring
          opportunities to build useful things together.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
