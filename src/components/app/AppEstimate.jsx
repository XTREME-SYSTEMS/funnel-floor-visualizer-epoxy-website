import React, { useState } from "react";
import { Save, TrendingUp, Info, MapPin, FileText, MessageSquare, Mail, Building, Search, Loader2 } from "lucide-react";
import { FLOOR_SYSTEM_DATA } from "@/lib/colorData";
import { SIZE_OPTIONS } from "@/lib/defaults";
import { useSettings } from "@/lib/useSettings";
import { XPS_LOCATIONS, nearestLocation } from "@/lib/xpsLocations";
import { Image } from "@/components/ui/image";

const SIZE_SQFT = { one_car: 240, two_car: 440, three_car: 660, four_car: 880, not_sure: 440 };
const HQ = XPS_LOCATIONS.find((l) => l.hq) || XPS_LOCATIONS[0];

export default function AppEstimate({ appData }) {
  const { settings } = useSettings();
  const { estimate, setEstimate, savedFloors } = appData;
  const [size, setSize] = useState(estimate?.garage_size || "two_car");
  const [systemKey, setSystemKey] = useState(estimate?.system_key || "flake-epoxy");
  const [customSqft, setCustomSqft] = useState(estimate?.custom_sqft || "");
  const [bidType, setBidType] = useState(estimate?.bidType || "range");
  const [zipCode, setZipCode] = useState(estimate?.zip_code || "");
  const [location, setLocation] = useState(estimate?.location || null);
  const [useHq, setUseHq] = useState(false);
  const [locating, setLocating] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const system = FLOOR_SYSTEM_DATA.find((s) => s.slug === systemKey) || FLOOR_SYSTEM_DATA[0];
  const sqft = size === "custom" ? (Number(customSqft) || 0) : SIZE_SQFT[size] || 440;
  const low = Math.round(sqft * system.base_rate_low);
  const high = Math.round(sqft * system.base_rate_high);
  const mid = Math.round((low + high) / 2);
  const perSqft = ((system.base_rate_low + system.base_rate_high) / 2).toFixed(2);
  const preciseBid = mid;

  const activeLocation = useHq ? HQ : location;
  const floorImage = savedFloors[0]?.resultUrl || savedFloors[0]?.photoUrl;

  const lookupLocation = async () => {
    if (!zipCode || zipCode.length !== 5) return;
    setLocating(true);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      const data = await res.json();
      if (data.places && data.places[0]) {
        const lat = parseFloat(data.places[0].latitude);
        const lng = parseFloat(data.places[0].longitude);
        const nearest = nearestLocation(lat, lng);
        setLocation(nearest);
        setUseHq(false);
      }
    } catch {}
    setLocating(false);
  };

  const handleSave = () => {
    setEstimate({
      garage_size: size,
      square_footage: sqft,
      system_key: systemKey,
      system_name: system.name,
      low, high, mid,
      bidType,
      custom_sqft: customSqft,
      zip_code: zipCode,
      location: activeLocation,
      calculatedAt: new Date().toISOString()
    });
  };

  const shareMessage = () => {
    const price = bidType === "precise"
      ? `$${preciseBid.toLocaleString()}`
      : `$${low.toLocaleString()}–${high.toLocaleString()}`;
    const locText = activeLocation ? ` · Serviced by ${activeLocation.city}, ${activeLocation.state}` : "";
    return `My garage floor estimate: ${price} for ${system.name} (${sqft} sq ft${locText}). Get yours at EpoxyGarageFloorEstimate.com`;
  };

  const shareSms = () => {
    window.location.href = `sms:?&body=${encodeURIComponent(shareMessage())}`;
  };

  const shareEmail = () => {
    const subject = "My Garage Floor Estimate from Epoxy Garage Floors";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareMessage())}`;
  };

  const generatePdf = async () => {
    setGeneratingPdf(true);
    try {
      const { generateBidPdf } = await import("@/lib/bidPdf");
      const lead = {
        first_name: "Homeowner",
        estimate_low: low,
        estimate_mid: mid,
        estimate_high: high,
        package_options: [],
        floor_condition: [],
      };
      const pdfBytes = await generateBidPdf(lead, settings, window.location.origin, {
        bidType,
        location: activeLocation,
        floorImageUrl: floorImage,
      });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Garage-Floor-Estimate.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
    setGeneratingPdf(false);
  };

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Instant Bid</h1>
      <p className="text-sm text-stone-500 mb-4">Get a price in seconds using national average pricing.</p>

      {/* Bid type toggle */}
      <div className="mb-4 flex gap-1 p-1 bg-stone-100 rounded-xl">
        <button
          onClick={() => setBidType("range")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${bidType === "range" ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
        >
          Price Range
        </button>
        <button
          onClick={() => setBidType("precise")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${bidType === "precise" ? "bg-white shadow text-stone-900" : "text-stone-500"}`}
        >
          Precise Bid
        </button>
      </div>

      {/* Size picker */}
      <div className="mb-4">
        <label className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2 block">Garage Size</label>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSize(s.key)}
              className={`py-3 px-2 rounded-xl text-xs font-semibold transition border-2 ${size === s.key ? "border-amber-500 bg-amber-50 text-stone-900" : "border-stone-200 bg-white text-stone-600"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {size === "custom" && (
          <input
            type="number"
            value={customSqft}
            onChange={(e) => setCustomSqft(e.target.value)}
            placeholder="Enter square footage"
            className="mt-2 w-full h-12 px-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-400 outline-none"
          />
        )}
      </div>

      {/* System picker */}
      <div className="mb-4">
        <label className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2 block">Floor System</label>
        <div className="space-y-2">
          {FLOOR_SYSTEM_DATA.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSystemKey(s.slug)}
              className={`w-full text-left p-3 rounded-xl border-2 transition flex items-center justify-between ${systemKey === s.slug ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-stone-900">{s.name}</div>
                <div className="text-[11px] text-stone-500 truncate">{s.description}</div>
              </div>
              <div className="text-right ml-3 shrink-0">
                <div className="text-xs font-bold text-stone-700">${s.base_rate_low}–${s.base_rate_high}</div>
                <div className="text-[10px] text-stone-400">per sq ft</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Location / Home Base */}
      <div className="mb-4">
        <label className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2 block">Your Home Base (Nearest XPS Store)</label>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter ZIP code"
            className="flex-1 h-11 px-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-400 outline-none"
          />
          <button
            onClick={lookupLocation}
            disabled={zipCode.length !== 5 || locating}
            className="h-11 px-4 rounded-xl bg-stone-900 text-white text-sm font-bold flex items-center gap-1.5 disabled:opacity-40"
          >
            {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </button>
        </div>
        <button
          onClick={() => { setUseHq(!useHq); if (!useHq) setLocation(null); }}
          className={`mt-2 w-full p-3 rounded-xl border-2 transition flex items-center gap-2 text-left ${useHq ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
        >
          <Building className="h-4 w-4 text-amber-600 shrink-0" />
          <div>
            <div className="text-xs font-bold text-stone-900">Use Corporate HQ — Pompano Beach, FL</div>
            <div className="text-[10px] text-stone-500">2200 NW 32nd St · (954) 516-1721</div>
          </div>
        </button>
        {activeLocation && (
          <div className="mt-2 p-3 rounded-xl bg-green-50 border border-green-200 flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700">
              <strong>{activeLocation.city}, {activeLocation.state}</strong>
              {activeLocation.hq ? " · Corporate HQ" : activeLocation.distance ? ` · ${activeLocation.distance} mi away` : ""}
              <div className="text-[10px] text-stone-500 mt-0.5">{activeLocation.address} · {activeLocation.phone}</div>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-5 text-center">
        <div className="text-xs font-bold tracking-wider text-amber-500 uppercase">
          {bidType === "precise" ? "Precise Estimate" : "Estimated Range"}
        </div>
        {bidType === "precise" ? (
          <div className="text-3xl font-extrabold text-white mt-1">${preciseBid.toLocaleString()}</div>
        ) : (
          <div className="text-3xl font-extrabold text-white mt-1">${low.toLocaleString()} – ${high.toLocaleString()}</div>
        )}
        <div className="text-sm text-stone-400 mt-1">{system.name} · {sqft} sq ft · avg ${perSqft}/sq ft</div>

        {/* Floor preview */}
        {floorImage && (
          <div className="mt-4 rounded-xl overflow-hidden border border-stone-700">
            <Image src={floorImage} alt="Your floor preview" fittingType="fill" className="h-32 w-full" />
            <div className="text-[10px] text-stone-400 py-1.5 bg-stone-900">Your floor preview</div>
          </div>
        )}

        <button onClick={handleSave} className="mt-4 w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition">
          <Save className="h-4 w-4" /> Save this bid
        </button>
      </div>

      {/* Share & PDF actions */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button onClick={shareSms} className="h-11 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:border-amber-300 transition">
          <MessageSquare className="h-4 w-4" /> SMS
        </button>
        <button onClick={shareEmail} className="h-11 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:border-amber-300 transition">
          <Mail className="h-4 w-4" /> Email
        </button>
        <button onClick={generatePdf} disabled={generatingPdf} className="h-11 rounded-xl bg-stone-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-stone-800 transition disabled:opacity-50">
          {generatingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          PDF Bid
        </button>
      </div>

      {/* National average info */}
      <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3 flex gap-2">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>How we calculate:</strong> {bidType === "precise" ? "Your precise bid" : "Ranges"} use national average install rates of ${system.base_rate_low}–${system.base_rate_high}/sq ft for {system.name}. Your final price depends on concrete condition, prep, and selected finish.
        </p>
      </div>

      {estimate && (
        <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-amber-600 shrink-0" />
          <p className="text-xs text-stone-700">
            Last saved bid: <strong>${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}</strong> for {estimate.system_name}
          </p>
        </div>
      )}
    </div>
  );
}