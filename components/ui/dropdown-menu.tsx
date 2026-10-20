"use client";

import Link from "next/link";
import { DropdownMenu } from "radix-ui";

export type DropdownMenuComponentItemsType = {
  label: string;
  href: string;
};

type DropdownMenuComponentProps = {
  items: DropdownMenuComponentItemsType[];
};

export default function DropdownMenuComponent({ items }: DropdownMenuComponentProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex items-center justify-center rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
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
          align="end"
          sideOffset={8}
          className="z-50 min-w-48 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg"
        >
          {items.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={item.href}
                className="block cursor-pointer rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-secondary focus:bg-secondary"
              >
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
