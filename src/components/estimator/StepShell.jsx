import React from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function StepShell({ step, total, title, helper, onBack, children, footer }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="sticky top-0 z-20 bg-stone-50/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-xl mx-auto px-5 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-stone-200 text-stone-700">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>
          <span className="text-xs font-medium text-stone-500 tabular-nums">Step {step} of {total}</span>
        </div>
      </div>

      <motion.div
        key={step + title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 max-w-xl w-full mx-auto px-5 py-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">{title}</h1>
        {helper && <p className="mt-3 text-stone-500 leading-relaxed">{helper}</p>}
        <div className="mt-7">{children}</div>
      </motion.div>

      {footer && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-stone-200">
          <div className="max-w-xl mx-auto px-5 py-4">{footer}</div>
        </div>
      )}
    </div>
  );
}

export function PrimaryButton(props) {
  return <Button {...props} className={`w-full h-14 text-base font-semibold rounded-xl bg-stone-900 hover:bg-stone-800 ${props.className || ""}`} />;
}