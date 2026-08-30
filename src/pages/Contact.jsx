import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import PageNav from "@/components/PageNav";
import PageHero from "@/components/PageHero";
import { useSettings } from "@/lib/useSettings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/home/Footer";

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    const to = settings.email || "jeremy@xtremepolishingsystems.com";
    const subject = encodeURIComponent(`Website inquiry from ${form.name || "a homeowner"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const methods = [
    {
      icon: Mail,
      label: "Email",
      value: settings.email || "jeremy@xtremepolishingsystems.com",
      href: `mailto:${settings.email || "jeremy@xtremepolishingsystems.com"}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings.phone || "(877) 958-6408",
      href: `tel:${(settings.phone || "").replace(/[^\d]/g, "")}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: settings.seo?.business_hours || "Mon–Sat 7:00am–7:00pm",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <PageNav />
      <PageHero
        eyebrow="We're here to help"
        title="Contact us"
        subtitle="Questions about your estimate, scheduling, or our floor systems? Reach out — a real specialist will get back to you."
      />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
          {/* contact methods */}
          <div className="space-y-4">
            {methods.map((m) => {
              const Inner = (
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-stone-200 p-5 hover:shadow-sm transition">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <m.icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-stone-500 uppercase">{m.label}</div>
                    <div className="mt-1 font-semibold text-stone-900">{m.value}</div>
                  </div>
                </div>
              );
              return m.href ? (
                <a key={m.label} href={m.href} className="block">{Inner}</a>
              ) : (
                <div key={m.label}>{Inner}</div>
              );
            })}
            <div className="flex items-start gap-4 rounded-2xl bg-white border border-stone-200 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <MapPin className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest text-stone-500 uppercase">Address</div>
                <div className="mt-1 font-semibold text-stone-900">
                  {settings.business_address || "2200 NW 32nd St #700, Pompano Beach, FL 33069"}
                </div>
              </div>
            </div>
          </div>

          {/* contact form */}
          <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-stone-200 p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-stone-900">Your name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="First and last name"
                className="mt-1.5 h-11"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stone-900">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="mt-1.5 h-11"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stone-900">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                className="mt-1.5 min-h-28"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold">
              <Send className="h-4 w-4 mr-2" /> Send message
            </Button>
            <p className="text-xs text-stone-500">
              This opens your email app. Or reach us directly at{" "}
              <a href={`mailto:${settings.email || "jeremy@xtremepolishingsystems.com"}`} className="font-semibold text-stone-700 underline">
                {settings.email || "jeremy@xtremepolishingsystems.com"}
              </a>
              .
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}