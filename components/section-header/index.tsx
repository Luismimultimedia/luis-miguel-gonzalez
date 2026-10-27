type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
};

const SectionHeader = ({ eyebrow, title }: SectionHeaderProps) => {
  return (
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-5xl">{title}</h2>
    </div>
  );
};

export default SectionHeader;
