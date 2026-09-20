"use client";
import Link from "next/link";
import { useState } from "react";
export function ContactForm({
  property = "",
  topic = "",
  email = "",
}: {
  property?: string;
  topic?: string;
  email?: string;
}) {
  const [result, setResult] = useState<{
    body: string;
    subject: string;
  } | null>(null);
  return (
    <form
      className="contact-form"
      onChange={() => setResult(null)}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult({
          subject: "ABS enquiry: " + String(data.get("topic")),
          body:
            "Name: " +
            data.get("name") +
            "\nEmail: " +
            data.get("email") +
            "\nProperty: " +
            (property || "Not specified") +
            "\n\n" +
            data.get("message"),
        });
      }}
    >
      <div className="form-notice" role="note">
        <strong>Demonstration only</strong>
        <p className="small">
          This form does not send or store messages. It creates a draft preview
          in your browser.
        </p>
      </div>
      <label htmlFor="contact-name">
        Your name
        <input id="contact-name" name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label htmlFor="contact-email">
        Email address
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label htmlFor="contact-topic">
        How can we help?
        <select
          id="contact-topic"
          name="topic"
          defaultValue={
            property
              ? "property"
              : topic === "valuation"
                ? "valuation"
                : "general"
          }
        >
          <option value="general">General enquiry</option>
          <option value="property">Property enquiry</option>
          <option value="valuation">Letting / valuation enquiry</option>
          <option value="management">Property management</option>
        </select>
      </label>
      {property && (
        <p className="small">
          Example property: <strong>{property}</strong>
        </p>
      )}
      <label htmlFor="contact-message">
        Your message
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          defaultValue={
            property
              ? "I would like to know more about this example property."
              : ""
          }
        />
      </label>
      <label className="consent">
        <input name="acknowledgement" type="checkbox" required />
        <span>
          I understand this is a demonstration and have read the{" "}
          <Link className="text-link" href="/legal/privacy">
            privacy notice
          </Link>
          .
        </span>
      </label>
      <button className="button" type="submit">
        Preview enquiry
      </button>
      {result && (
        <div className="form-status" role="status">
          <strong>Enquiry preview ready — not sent.</strong>
          <p className="small">
            {email
              ? "You can open a draft in your own email app. You must review and send it yourself."
              : "Live contact details have not been configured. No message has been sent or stored."}
          </p>
          <pre className="whitespace-pre-wrap break-words text-sm mt-4">
            {result.body}
          </pre>
          {email && (
            <a
              className="button"
              href={
                "mailto:" +
                email +
                "?subject=" +
                encodeURIComponent(result.subject) +
                "&body=" +
                encodeURIComponent(result.body)
              }
            >
              Open email draft
            </a>
          )}
        </div>
      )}
    </form>
  );
}
