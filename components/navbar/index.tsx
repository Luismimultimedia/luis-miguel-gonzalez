import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import MenuToggle from "../menu-toggle";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  return (
    <header className="flex sticky top-0 z-40 h-14 px-5 items-center border-b border-gray-200 dark:border-gray-50/10 bg-background/80 backdrop-blur-md">
      <div className="flex w-full max-w-6xl gap-x-2 md:gap-x-7 md:justify-between items-center mx-auto">
        <Link href="/" className="flex-1 font-display text-2xl tracking-tight active">
          LMG
          <span className="text-primary">.</span>
        </Link>
        <nav className="space-x-7 hidden md:inline">
          {menuItems.map((item) => (
            <Link
              key={`menu-itme ${item.label}`}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
        <MenuToggle
          items={menuItems}
          classNameTrigger="md:hidden"
          classNameContent="w-screen rounded-none"
        />
      </div>
    </header>
  );
};

export default Navbar;
