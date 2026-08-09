import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export default function ListEditor({ title, items = [], fields, onChange, blank }) {
  const update = (i, key, value) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-stone-900">{title}</h2>
        <Button variant="outline" size="sm" onClick={() => onChange([...items, { ...blank }])}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-stone-100 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
                  <label className="text-xs font-medium text-stone-500">{f.label}</label>
                  <Input
                    type={f.type === "number" ? "number" : "text"}
                    step="any"
                    className="mt-1"
                    value={item[f.key] ?? ""}
                    onChange={(e) => update(i, f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button onClick={() => onChange(items.filter((_, k) => k !== i))} className="mt-3 text-xs text-red-600 flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}