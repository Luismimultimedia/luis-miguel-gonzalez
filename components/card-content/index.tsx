import { cn } from "@/utils/cn-merge";

type CardContentProps = {
  children: React.ReactNode;
  classnameContainer?: string;
};

const CardContent = ({ children, classnameContainer }: CardContentProps) => {
  return (
    <div className={cn("h-fit rounded-lg border bg-card p-7 shadow-soft", classnameContainer)}>
      {children}
    </div>
  );
};

export default CardContent;
