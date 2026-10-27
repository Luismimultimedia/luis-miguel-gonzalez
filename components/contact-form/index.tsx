"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactFormState } from "@/utils/contact";

const initialState: ContactFormState = {
  ok: false,
  error: null,
};

const fieldClassName =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const ContactForm = () => {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-card p-7 text-sm leading-relaxed text-muted-foreground shadow-soft"
      >
        <p className="font-medium text-foreground">Message sent.</p>
        <p className="mt-2">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            disabled={pending}
            placeholder="Your name"
            className={fieldClassName}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={pending}
            placeholder="you@example.com"
            className={fieldClassName}
          />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Subject</span>
        <input
          type="text"
          name="subject"
          required
          disabled={pending}
          placeholder="What is this about?"
          className={fieldClassName}
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          disabled={pending}
          placeholder="What are you thinking about?"
          className={`${fieldClassName} resize-y min-h-32`}
        />
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
