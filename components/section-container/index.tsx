import React from "react";

type SectionContainerProps = {
  children: React.ReactNode;
  id?: string;
};

const SectionContainer = ({ children, id }: SectionContainerProps) => {
  return (
    <section {...(id ? { id: id } : {})} className="border-t border-zinc-200 dark:border-zinc-800">
      {children}
    </section>
  );
};

export default SectionContainer;
