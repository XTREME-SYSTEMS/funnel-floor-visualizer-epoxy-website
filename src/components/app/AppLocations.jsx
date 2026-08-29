import React, { useState } from "react";
import { MapPin, Phone, Search, Navigation } from "lucide-react";
import { ALL_XPS_LOCATIONS, nearestLocation } from "@/lib/xpsLocations";

export default function AppLocations() {
  const [zip, setZip] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!zip || zip.length < 5) return;
    setSearching(true);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      const data = await res.json();
      if (data?.places?.[0]) {
        const lat = parseFloat(data.places[0].latitude);
        const lng = parseFloat(data.places[0].longitude);
        const nearest = nearestLocation(lat, lng);
        const sorted = ALL_XPS_LOCATIONS
          .map((l) => ({ ...l, distance: Math.round(haversine(lat, lng, l.lat, l.lng)) }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);
        setResults({ nearest, sorted });
      }
    } catch {
      setResults({ nearest: null, sorted: ALL_XPS_LOCATIONS.slice(0, 10) });
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">Find a Store</h1>
      <p className="text-sm text-stone-500 mb-4">Enter your ZIP code to find the nearest XPS Xpress location.</p>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="Enter ZIP code"
            className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-400 outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} disabled={searching} className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm disabled:opacity-50">
          {searching ? "…" : "Find"}
        </button>
      </div>

      {results && (
        <div className="space-y-3">
          {results.nearest && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Navigation className="h-3.5 w-3.5" /> Nearest Location
              </div>
              <div className="font-bold text-stone-900">{results.nearest.city}, {results.nearest.state}</div>
              <div className="text-sm text-stone-600">{results.nearest.address}</div>
              <div className="text-sm text-stone-500 mt-1">{results.nearest.distance} miles away · {results.nearest.phone}</div>
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold text-stone-900 mb-2">All Nearby Locations</h2>
            {results.sorted.map((loc, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-stone-100">
                <div className="h-9 w-9 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-stone-900">{loc.city}, {loc.state} {loc.hq && <span className="text-[10px] bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded ml-1">HQ</span>}</div>
                  <div className="text-xs text-stone-500">{loc.address}</div>
                  <a href={`tel:${loc.phone}`} className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" /> {loc.phone}
                  </a>
                </div>
                {loc.distance != null && <div className="text-xs font-bold text-stone-700 shrink-0">{loc.distance} mi</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!results && (
        <div>
          <h2 className="text-sm font-bold text-stone-900 mb-2">All Locations ({ALL_XPS_LOCATIONS.length})</h2>
          <div className="space-y-2">
            {ALL_XPS_LOCATIONS.map((loc, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100">
                <div>
                  <div className="text-sm font-semibold text-stone-800">{loc.city}, {loc.state}</div>
                  <div className="text-xs text-stone-400">{loc.phone}</div>
                </div>
                <MapPin className="h-4 w-4 text-stone-300" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function haversine(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}