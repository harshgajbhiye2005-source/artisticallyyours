"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/lib/content";
import { asset } from "@/lib/asset";
import Image from "next/image";

const fields = [
  { label: "first name", name: "first_name", type: "text", required: true },
  { label: "last name", name: "last_name", type: "text", required: true },
  { label: "company name", name: "company", type: "text", required: false },
  { label: "email", name: "email", type: "email", required: true },
  { label: "phone number", name: "phone", type: "tel", required: true },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Until the studio's Web3Forms key is set, keep the demo behaviour so the
    // form still gives feedback instead of silently failing.
    if (!contact.web3formsKey) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    data.append("access_key", contact.web3formsKey);
    data.append("subject", "New enquiry from artisticallyyours.in");
    data.append("from_name", "Artistically Yours website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const sent = status === "sent";

  return (
    <section id="contact" className="bg-green py-20 text-white">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <Image
              src={asset("/mascot.png")}
              alt="Zepu, the studio cat"
              width={1225}
              height={1567}
              className="h-20 w-auto shrink-0"
            />
            <div>
              <h2 className="heading text-[clamp(1.8rem,4vw,2.8rem)]">
                {contact.heading}
              </h2>
              <p className="mt-1 text-sm text-white/90">{contact.sub}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          {sent ? (
            <div className="mt-12 border border-white/40 p-10 text-center">
              <p className="heading text-2xl">Thanks — message received!</p>
              <p className="mt-3 text-white/80">
                {contact.web3formsKey
                  ? "We'll be in touch shortly."
                  : "Demo mode — add the Web3Forms key to start receiving enquiries."}
              </p>
            </div>
          ) : (
            <form
              className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2"
              onSubmit={handleSubmit}
            >
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="block text-sm text-white/90">
                    {field.label}
                  </span>
                  <input
                    name={field.name}
                    required={field.required}
                    type={field.type}
                    autoComplete={field.name}
                    className="mt-2 w-full border-b border-white/60 bg-transparent pb-2 text-base outline-none transition-colors focus:border-white"
                  />
                </label>
              ))}

              {/* Honeypot — bots fill this, humans never see it */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden
                className="hidden"
              />

              <label className="block sm:col-span-2">
                <span className="block text-sm text-white/90">your message</span>
                <textarea
                  name="message"
                  rows={2}
                  className="mt-2 w-full resize-none border-b border-white/60 bg-transparent pb-2 text-base outline-none transition-colors focus:border-white"
                />
              </label>

              {/* Footer bar: contact details + submit */}
              <div className="mt-6 flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <span
                    aria-hidden
                    className="heading text-3xl leading-none tracking-tight"
                  >
                    AY
                  </span>
                  <div>
                    <p className="text-sm font-medium">{contact.bell}</p>
                    <div className="mt-1 flex gap-4 text-sm">
                      {site.socials.map((s) =>
                        s.href === "#" ? (
                          <span key={s.label} className="text-white/80">
                            {s.label}
                          </span>
                        ) : (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 transition-colors hover:text-white"
                          >
                            {s.label}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="hidden text-sm sm:block">
                    <a
                      href={`mailto:${site.email}`}
                      className="block text-white/90 transition-colors hover:text-white"
                    >
                      {site.email}
                    </a>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="block text-white/90 transition-colors hover:text-white"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-white px-10 py-3 text-sm font-medium text-green transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? "sending…" : "submit"}
                  </button>
                  {status === "error" && (
                    <p role="alert" className="mt-2 max-w-[15rem] text-sm">
                      Couldn&apos;t send. Please email{" "}
                      <a className="underline" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>

              {/* Contact details on mobile */}
              <div className="text-sm sm:col-span-2 sm:hidden">
                <a href={`mailto:${site.email}`} className="block text-white/90">
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="block text-white/90"
                >
                  {site.phone}
                </a>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
