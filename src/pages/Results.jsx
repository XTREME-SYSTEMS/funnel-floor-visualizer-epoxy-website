import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useSettings } from "@/lib/useSettings";
import { money } from "@/lib/pricing";
import { trackEvent } from "@/lib/tracking";
import PackageCards from "@/components/results/PackageCards";
import TrustSection from "@/components/results/TrustSection";
import Gallery from "@/components/home/Gallery";
import Reviews from "@/components/home/Reviews";

const Row = ({ label, value }) => (
  <div className="py-3 border-b border-stone-200 flex justify-between gap-6 text-sm">
    <span className="text-stone-500">{label}</span>
    <span className="font-medium text-stone-900 text-right">{value}</span>
  </div>
);

export default function Results() {
  const { id } = useParams();
  const { settings } = useSettings();
  const { data: lead, isLoading } = useQuery({ queryKey: ["lead", id], queryFn: () => base44.entities.Lead.get(id) });

  useEffect(() => {
    if (lead) trackEvent("estimate_viewed", { lead_id: lead.id });
  }, [lead]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
      </div>
    );
  }
  if (!lead) return <div className="min-h-screen flex items-center justify-center text-stone-500">Estimate not found.</div>;

  const system = (settings.systems || []).find((s) => s.key === lead.desired_system);

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">{settings.company_name}</Link>
          <a href={`tel:${settings.phone}`} className="text-sm text-stone-300">{settings.phone}</a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900">
            Your Estimated Garage Floor Investment
          </h1>
          <p className="mt-2 text-stone-500">Prepared for {lead.first_name} {lead.last_name}</p>
        </div>

        <div className="rounded-3xl bg-white border border-stone-200 p-7">
          <Row label="Property address" value={`${lead.address}, ${lead.city}, ${lead.state} ${lead.zip}`} />
          <Row label="Estimated garage size" value={`${(lead.square_footage || 0).toLocaleString()} sq ft`} />
          <Row label="Selected floor system" value={system?.name || lead.desired_system} />
          <Row label="Project timeline" value={lead.timeline} />

          <div className="mt-8 text-center">
            <div className="text-xs font-bold tracking-[0.25em] text-amber-600">ESTIMATED PROJECT RANGE</div>
            <div className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 tabular-nums">
              {money(lead.estimate_low)} – {money(lead.estimate_high)}
            </div>
            {settings.is_test_pricing && (
              <div className="mt-3 inline-block text-[11px] font-bold tracking-widest bg-stone-900 text-amber-400 px-3 py-1 rounded">
                TEST DATA — DEMO PRICING
              </div>
            )}
            <p className="mt-5 text-sm text-stone-500 leading-relaxed max-w-xl mx-auto">
              This is an initial project estimate based on the information you provided. Your exact price will be confirmed
              after speaking with a floor specialist and, when necessary, inspecting your concrete.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 mb-4">Choose your level of finish</h2>
          <PackageCards packages={lead.package_options} />
        </div>

        <TrustSection
          settings={settings}
          leadId={lead.id}
          onConsultationClick={() => trackEvent("consultation_clicked", { lead_id: lead.id })}
        />

        <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-200 pt-6">{settings.disclaimer}</p>
      </div>

      <Reviews settings={settings} />
      <Gallery items={settings.gallery} />

      <footer className="bg-stone-950 text-stone-400 py-10 px-6 text-sm">
        <div className="max-w-3xl mx-auto">
          <div className="text-white font-semibold">{settings.company_name}</div>
          <div className="mt-1">{settings.phone} · {settings.email}</div>
          <div className="mt-1">Serving {settings.service_area}</div>
        </div>
      </footer>
    </div>
  );
}