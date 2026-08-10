import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { DEFAULT_SETTINGS } from "@/lib/defaults";
import ListEditor from "@/components/admin/ListEditor";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";

const Field = ({ label, children }) => (
  <div>
    <label className="text-xs font-medium text-stone-500">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

export default function SettingsPage() {
  const { settings, record, refetch } = useSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!form) setForm({ ...DEFAULT_SETTINGS, ...settings });
  }, [settings, form]);

  if (!form) return null;
  const set = (patch) => setForm({ ...form, ...patch });
  const num = (v) => Number(v) || 0;

  const save = async () => {
    const payload = { ...form };
    delete payload.id;
    delete payload.created_date;
    delete payload.updated_date;
    delete payload.created_by_id;
    if (record?.id) await base44.entities.AppSettings.update(record.id, payload);
    else await base44.entities.AppSettings.create(payload);
    await refetch();
    qc.invalidateQueries({ queryKey: ["app-settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Estimator settings</h1>

      <div className="rounded-2xl bg-white border border-stone-200 p-6 grid gap-4 sm:grid-cols-2">
        <h2 className="font-semibold text-stone-900 sm:col-span-2">Business</h2>
        <Field label="Company name"><Input value={form.company_name || ""} onChange={(e) => set({ company_name: e.target.value })} /></Field>
        <Field label="Phone"><Input value={form.phone || ""} onChange={(e) => set({ phone: e.target.value })} /></Field>
        <Field label="Email"><Input value={form.email || ""} onChange={(e) => set({ email: e.target.value })} /></Field>
        <Field label="Service area"><Input value={form.service_area || ""} onChange={(e) => set({ service_area: e.target.value })} /></Field>
        <Field label="Primary city"><Input value={form.primary_city || ""} onChange={(e) => set({ primary_city: e.target.value })} /></Field>
        <Field label="Primary state"><Input value={form.primary_state || ""} onChange={(e) => set({ primary_state: e.target.value })} /></Field>
        <Field label="Hero image URL"><Input value={form.hero_image_url || ""} onChange={(e) => set({ hero_image_url: e.target.value })} /></Field>
        <Field label="Calendar / scheduler URL (optional embed)"><Input value={form.calendar_url || ""} onChange={(e) => set({ calendar_url: e.target.value })} /></Field>
        <Field label="Google Maps Embed API key (for store Street View)"><Input value={form.google_maps_api_key || ""} onChange={(e) => set({ google_maps_api_key: e.target.value })} placeholder="AIza..." /></Field>
        <div className="sm:col-span-2 flex items-center gap-3 pt-2">
          <Switch checked={!!form.is_test_pricing} onCheckedChange={(v) => set({ is_test_pricing: v })} />
          <span className="text-sm text-stone-600">Show "TEST DATA — DEMO PRICING" badge on estimates</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-6 grid gap-4 sm:grid-cols-3">
        <h2 className="font-semibold text-stone-900 sm:col-span-3">Pricing engine</h2>
        <Field label="Minimum project price ($)"><Input type="number" value={form.minimum_project_price ?? ""} onChange={(e) => set({ minimum_project_price: num(e.target.value) })} /></Field>
        <Field label="Low range %"><Input type="number" value={form.range_low_percent ?? ""} onChange={(e) => set({ range_low_percent: num(e.target.value) })} /></Field>
        <Field label="High range %"><Input type="number" value={form.range_high_percent ?? ""} onChange={(e) => set({ range_high_percent: num(e.target.value) })} /></Field>
        {["one_car", "two_car", "three_car", "four_car", "not_sure"].map((k) => (
          <Field key={k} label={`Default sq ft · ${k.replace("_", " ")}`}>
            <Input
              type="number"
              value={form.size_defaults?.[k] ?? ""}
              onChange={(e) => set({ size_defaults: { ...form.size_defaults, [k]: num(e.target.value) } })}
            />
          </Field>
        ))}
      </div>

      <ListEditor
        title="Floor systems"
        items={form.systems}
        onChange={(systems) => set({ systems })}
        blank={{ key: "", name: "", description: "", image_url: "", price_per_sqft: 0 }}
        fields={[
          { key: "key", label: "Key (unique)" },
          { key: "name", label: "Name" },
          { key: "price_per_sqft", label: "Base price per sq ft ($)", type: "number" },
          { key: "image_url", label: "Image URL" },
          { key: "description", label: "Description", wide: true }
        ]}
      />

      <ListEditor
        title="Condition adjustments"
        items={form.condition_adjustments}
        onChange={(condition_adjustments) => set({ condition_adjustments })}
        blank={{ key: "", label: "", percent: 0 }}
        fields={[
          { key: "key", label: "Key (unique)" },
          { key: "label", label: "Label shown to homeowner" },
          { key: "percent", label: "Adjustment %", type: "number" }
        ]}
      />

      <ListEditor
        title="Good / Better / Best packages"
        items={form.packages}
        onChange={(packages) => set({ packages })}
        blank={{ tier: "", name: "", description: "", multiplier: 1 }}
        fields={[
          { key: "tier", label: "Tier label" },
          { key: "name", label: "Package name" },
          { key: "multiplier", label: "Price multiplier", type: "number" },
          { key: "description", label: "Description", wide: true }
        ]}
      />

      <div className="rounded-2xl bg-white border border-stone-200 p-6 grid gap-4 sm:grid-cols-2">
        <h2 className="font-semibold text-stone-900 sm:col-span-2">Floor specialist</h2>
        {[["name", "Name"], ["title", "Title"], ["phone", "Phone"], ["photo_url", "Headshot URL"]].map(([k, l]) => (
          <Field key={k} label={l}>
            <Input value={form.salesperson?.[k] || ""} onChange={(e) => set({ salesperson: { ...form.salesperson, [k]: e.target.value } })} />
          </Field>
        ))}
        <div className="sm:col-span-2">
          <Field label="Short bio">
            <Textarea value={form.salesperson?.bio || ""} onChange={(e) => set({ salesperson: { ...form.salesperson, bio: e.target.value } })} />
          </Field>
        </div>
      </div>

      <ListEditor
        title="Testimonials"
        items={form.testimonials}
        onChange={(testimonials) => set({ testimonials })}
        blank={{ name: "", location: "", quote: "", rating: 5 }}
        fields={[
          { key: "name", label: "Name" },
          { key: "location", label: "Location" },
          { key: "rating", label: "Rating", type: "number" },
          { key: "quote", label: "Quote", wide: true }
        ]}
      />

      <ListEditor
        title="Before / after photos"
        items={form.gallery}
        onChange={(gallery) => set({ gallery })}
        blank={{ before_url: "", after_url: "", caption: "" }}
        fields={[
          { key: "before_url", label: "Before image URL" },
          { key: "after_url", label: "After image URL" },
          { key: "caption", label: "Caption", wide: true }
        ]}
      />

      <div className="rounded-2xl bg-white border border-stone-200 p-6 grid gap-4 sm:grid-cols-2">
        <h2 className="font-semibold text-stone-900 sm:col-span-2">SEO</h2>
        <Field label="Site name"><Input value={form.seo?.site_name || ""} onChange={(e) => set({ seo: { ...form.seo, site_name: e.target.value } })} /></Field>
        <Field label="Business category"><Input value={form.seo?.business_category || ""} onChange={(e) => set({ seo: { ...form.seo, business_category: e.target.value } })} /></Field>
        <Field label="Default meta title"><Input value={form.seo?.default_title || ""} onChange={(e) => set({ seo: { ...form.seo, default_title: e.target.value } })} /></Field>
        <Field label="Business hours"><Input value={form.seo?.business_hours || ""} onChange={(e) => set({ seo: { ...form.seo, business_hours: e.target.value } })} /></Field>
        <div className="sm:col-span-2">
          <Field label="Default meta description"><Textarea value={form.seo?.default_description || ""} onChange={(e) => set({ seo: { ...form.seo, default_description: e.target.value } })} /></Field>
        </div>
        <Field label="Google Business Profile URL"><Input value={form.seo?.gbp_url || ""} onChange={(e) => set({ seo: { ...form.seo, gbp_url: e.target.value } })} /></Field>
        <Field label="Review URL"><Input value={form.seo?.review_url || ""} onChange={(e) => set({ seo: { ...form.seo, review_url: e.target.value } })} /></Field>
      </div>

      <div className="rounded-2xl bg-white border border-stone-200 p-6 space-y-4">
        <h2 className="font-semibold text-stone-900">Legal copy</h2>
        <Field label="Estimate disclaimer">
          <Textarea className="min-h-28" value={form.disclaimer || ""} onChange={(e) => set({ disclaimer: e.target.value })} />
        </Field>
        <Field label="Consent language">
          <Textarea value={form.consent_language || ""} onChange={(e) => set({ consent_language: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Google rating"><Input type="number" step="0.1" value={form.google_rating ?? ""} onChange={(e) => set({ google_rating: num(e.target.value) })} /></Field>
          <Field label="Google review count"><Input type="number" value={form.google_review_count ?? ""} onChange={(e) => set({ google_review_count: num(e.target.value) })} /></Field>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-5 flex items-center gap-4">
          <Button onClick={save} className="h-11 px-8 bg-stone-900 hover:bg-stone-800">Save settings</Button>
          {saved && <span className="text-sm text-green-700 font-medium">Saved</span>}
        </div>
      </div>
    </div>
  );
}