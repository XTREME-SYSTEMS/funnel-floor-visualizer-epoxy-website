import React from "react";

export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="bg-stone-950 px-6 pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase">{eyebrow}</div>
        )}
        <h1 className="mt-3 text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}