"use client";

/*
 * Contact
 * Purpose: Contact form for startups and partners to reach out.
 * Authors: Shreya Joshi, Chinmay Joshi
 */

import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import { CheckCircle, ArrowRight } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
  fundingStage: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  fundingStage: "",
  message: "",
};

const fundingStages = [
  "Pre-seed / Idea",
  "Seed",
  "Pre-Series A",
  "Series A",
  "Series B+",
  "Growth Stage",
  "Not raising",
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Please include a brief message.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Static/demo: simulate API delay
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `form-input ${errors[field] ? "!border-terracotta focus:!border-terracotta" : ""}`;

  return (
    <section
      id="contact"
      className="py-section bg-ivory relative overflow-hidden"
      aria-label="Contact BLUEOAK Ventures"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ivory-warm to-transparent" />
        <svg className="absolute top-8 right-8 opacity-[0.04] w-48 h-48" viewBox="0 0 120 120" fill="none">
          {[10, 20, 30, 40, 50].map((r, i) => (
            <circle key={i} cx="60" cy="60" r={r} stroke="#12372A" strokeWidth="0.6" />
          ))}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <line
              key={i}
              x1={60}
              y1={60}
              x2={60 + Math.cos((deg * Math.PI) / 180) * 55}
              y2={60 + Math.sin((deg * Math.PI) / 180) * 55}
              stroke="#12372A"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </div>

      <div className="container-site relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: heading + context */}
            <div>
              <SectionHeading
                label="Get in touch"
                title="Let's build"
                titleHighlight=" what comes next."
                subtitle="We'd love to hear about your startup. Share what you're building and we'll be in touch."
                titleClassName="text-display-md"
              />

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-oak-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-oak-teal text-base" aria-hidden="true">◈</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">Founder-first approach</h4>
                    <p className="mt-1 text-sm text-ink-muted">
                      We respond to every thoughtful submission. If there&apos;s a fit,
                      we&apos;ll schedule a call within 5 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-base" aria-hidden="true">◎</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">What we look for</h4>
                    <p className="mt-1 text-sm text-ink-muted">
                      Ambitious Indian founders building for India and the world —
                      across sectors, stages, and geographies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-terracotta text-base" aria-hidden="true">◉</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">For general enquiries</h4>
                    <p className="mt-1 text-sm text-ink-muted">
                      Strategic advisory, partnerships, media, and other enquiries are
                      also welcome through this form.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social placeholders */}
              <div className="mt-10 pt-8 border-t border-ivory-sand/60">
                <p className="text-xs text-ink-subtle mb-4 uppercase tracking-wider">Follow along</p>
                <div className="flex gap-3">
                  {["LinkedIn", "X / Twitter", "Instagram"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-xs px-3 py-2 rounded-lg border border-ivory-sand text-ink-muted hover:border-oak-teal/30 hover:text-oak-teal transition-all duration-200"
                      aria-label={`BLUEOAK Ventures on ${s}`}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="relative">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-3xl border border-ivory-sand/60 shadow-card p-6 sm:p-8 space-y-5"
                  aria-label="Contact form"
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-ink mb-1.5">
                        Name <span className="text-terracotta" aria-label="required">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={inputClass("name")}
                        aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-1 text-xs text-terracotta">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
                        Email <span className="text-terracotta" aria-label="required">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@startup.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass("email")}
                        aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-terracotta">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company + Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-ink mb-1.5">
                        Company / Startup
                      </label>
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your company name"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-xs font-semibold text-ink mb-1.5">
                        Website
                      </label>
                      <input
                        id="website"
                        type="url"
                        autoComplete="url"
                        placeholder="https://yourstartup.com"
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Funding stage */}
                  <div>
                    <label htmlFor="fundingStage" className="block text-xs font-semibold text-ink mb-1.5">
                      Current funding stage
                    </label>
                    <select
                      id="fundingStage"
                      value={form.fundingStage}
                      onChange={(e) => update("fundingStage", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select your stage (optional)</option>
                      {fundingStages.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-ink mb-1.5">
                      Message <span className="text-terracotta" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your startup and what you're building..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputClass("message")} resize-none`}
                      aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1 text-xs text-terracotta">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold bg-oak-teal text-ivory hover:bg-oak-forest transition-all duration-300 hover:-translate-y-0.5 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-busy={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Start a Conversation
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-ink-subtle/60">
                    This is a demo form. Submissions are not processed in production.
                    <br />
                    Connect a backend or service (Formspree, Resend) when ready to go live.
                  </p>
                </form>
              ) : (
                /* Success state */
                <div className="bg-white rounded-3xl border border-ivory-sand/60 shadow-card p-8 sm:p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oak-teal/10 mb-6">
                    <CheckCircle className="w-8 h-8 text-oak-teal" />
                  </div>
                  <h3
                    className="text-xl font-bold text-ink mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Message sent.
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    Thank you for reaching out. If there&apos;s alignment, we&apos;ll be
                    in touch within 5 business days.
                  </p>
                  <p className="text-xs text-ink-subtle/60 italic mb-6">
                    Note: This is a demo — no data was actually submitted.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialState); }}
                    className="text-sm font-medium text-oak-teal hover:text-oak-forest underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
