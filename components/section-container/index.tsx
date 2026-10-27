import React from "react";

type SectionContainerProps = {
  children: React.ReactNode;
};

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <section className="border-t border-zinc-200 dark:border-zinc-800">{children}</section>;
};

export default SectionContainer;
