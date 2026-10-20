"use client";

import Link from "next/link";
import { DropdownMenu } from "radix-ui";
import { cn } from "@/utils/cn-merge";

export type MenuToggleItemsType = {
  label: string;
  href: string;
};

type MenuToggleProps = {
  items: MenuToggleItemsType[];
  classNameTrigger?: string;
  classNameContent?: string;
};

export default function MenuToggle({ items, classNameTrigger, classNameContent }: MenuToggleProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className={cn(
            "flex items-center justify-center rounded border border-border p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary",
            classNameTrigger,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className={cn(
            "z-50 w-screen max-w-none rounded-none border-x-0 border-border",
            "bg-background px-5 py-2 text-foreground shadow-lg",
            classNameContent,
          )}
        >
          {items.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link href={item.href} className="block py-2.5 text-base active">
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
