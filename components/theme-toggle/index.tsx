
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

const getSnapshot = () => true;

const getServerSnapshot = () => false;

const ThemeToggle = () => {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Change color theme"
        disabled
        className="size-10 rounded-full"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex size-10 items-center justify-center rounded-full
        border border-gray-200 text-gray-900 transition-colors
        hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100
        dark:hover:bg-gray-800"
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
