"use server";

import { Resend } from "resend";

export type ContactFormState = {
  ok: boolean;
  error: string | null;
};

const CONTACT_EMAIL = "luismimultimedia@gmail.com";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const subject = getString(formData, "subject");
  const message = getString(formData, "message");

  if (!name || !email || !subject || !message) {
    return { ok: false, error: "Please fill in all fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Email is not configured. Please try again later." };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Personal Website <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `${subject} — Personal Website`,
    text: [
      "This message was sent from your personal website.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true, error: null };
}
