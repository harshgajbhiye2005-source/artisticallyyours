"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/lib/content";
import CatMascot from "@/components/CatMascot";

const fields = [
  { label: "first name", type: "text", required: true },
  { label: "last name", type: "text", required: true },
  { label: "company name", type: "text", required: false },
  { label: "email", type: "email", required: true },
  { label: "phone number", type: "tel", required: true },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-green py-20 text-white">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <CatMascot className="h-16 w-16 shrink-0" stroke="#ffffff" />
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
                This is a demo form. Wire it to email or a form service before
                launch.
              </p>
            </div>
          ) : (
            <form
              className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {fields.map((field) => (
                <label key={field.label} className="block">
                  <span className="block text-sm text-white/90">
                    {field.label}
                  </span>
                  <input
                    required={field.required}
                    type={field.type}
                    className="mt-2 w-full border-b border-white/60 bg-transparent pb-2 text-base outline-none transition-colors focus:border-white"
                  />
                </label>
              ))}

              <label className="block sm:col-span-2">
                <span className="block text-sm text-white/90">your message</span>
                <textarea
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
                      {site.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          className="text-white/80 transition-colors hover:text-white"
                        >
                          {s.label}
                        </a>
                      ))}
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

                <button
                  type="submit"
                  className="self-start bg-white px-10 py-3 text-sm font-medium text-green transition-transform duration-300 hover:scale-105 sm:self-auto"
                >
                  submit
                </button>
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
