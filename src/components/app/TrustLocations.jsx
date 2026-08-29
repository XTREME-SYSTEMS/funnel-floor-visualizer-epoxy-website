import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { XPS_LOCATIONS, nearestLocation } from "@/lib/xpsLocations";
import { Search, MapPin, Phone, Navigation, Loader2, Building } from "lucide-react";

const goldIcon = L.divIcon({
  className: "",
  html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:linear-gradient(180deg,#FFE25A,#FFD700 45%,#C8A300);border:2px solid #000;box-shadow:0 3px 8px rgba(0,0,0,0.3);transform:rotate(-45deg);"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

const hqIcon = L.divIcon({
  className: "",
  html: '<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:linear-gradient(180deg,#FFE25A,#FFD700 45%,#C8A300);border:3px solid #000;box-shadow:0 4px 12px rgba(255,215,0,0.5);transform:rotate(-45deg);"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 11, { duration: 1.5 });
    }
  }, [target, map]);
  return null;
}

export default function TrustLocations() {
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState(null);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const lookupZip = async () => {
    if (zip.length !== 5) return;
    setLocating(true);
    setError("");
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      const data = await res.json();
      if (data.places && data.places[0]) {
        const lat = parseFloat(data.places[0].latitude);
        const lng = parseFloat(data.places[0].longitude);
        const nearest = nearestLocation(lat, lng);
        setSelected(nearest);
      } else {
        setError("Invalid ZIP code");
      }
    } catch {
      setError("Could not look up ZIP");
    }
    setLocating(false);
  };

  return (
    <div className="p-4 pb-6">
      <h1 className="text-xl font-display font-extrabold text-stone-900 mb-1">70+ Locations Nationwide</h1>
      <p className="text-sm text-stone-500 mb-4">
        With over 70 XPS Xpress stores across the United States, professional-grade products and expert support are always nearby. Enter your ZIP code to find your nearest store.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter ZIP code"
          className="flex-1 h-12 px-4 rounded-xl border-2 border-stone-200 text-sm focus:border-amber-500 outline-none"
        />
        <button
          onClick={lookupZip}
          disabled={zip.length !== 5 || locating}
          className="xa-cta-gold"
          style={{ width: "auto", minHeight: 48, padding: "0 20px" }}
        >
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span>Search</span>
        </button>
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <div className="rounded-2xl overflow-hidden border-2 border-black mb-4" style={{ height: 280 }}>
        <MapContainer center={[39.5, -98.35]} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          {XPS_LOCATIONS.map((loc, i) => (
            <Marker
              key={`${loc.city}-${loc.state}-${i}`}
              position={[loc.lat, loc.lng]}
              icon={loc.hq ? hqIcon : goldIcon}
              eventHandlers={{ click: () => setSelected(loc) }}
            >
              <Popup>
                <strong>{loc.city}, {loc.state}</strong>{loc.hq ? " — HQ" : ""}<br />
                {loc.address}<br />{loc.phone}
              </Popup>
            </Marker>
          ))}
          <FlyTo target={selected} />
        </MapContainer>
      </div>

      {selected && (
        <div className="rounded-2xl border-2 border-black p-4 bg-white mb-4" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(180deg, #FFE25A 0%, #FFD700 45%, #C8A300 100%)", border: "2px solid #000", boxShadow: "0 4px 10px rgba(255,215,0,0.4), inset 0 1px rgba(255,255,255,0.4)" }}>
              {selected.hq ? <Building className="h-5 w-5 text-stone-900" strokeWidth={2} /> : <MapPin className="h-5 w-5 text-stone-900" strokeWidth={2} />}
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold text-stone-900">
                {selected.city}, {selected.state}
                {selected.hq && <span className="ml-2 text-[10px] font-bold text-amber-600 uppercase">HQ</span>}
              </div>
              <div className="text-sm text-stone-600 mt-0.5">{selected.address}</div>
              <a href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`} className="text-sm text-amber-600 font-semibold mt-1 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> {selected.phone}
              </a>
              {selected.distance != null && (
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                  <Navigation className="h-3 w-3" /> {selected.distance} miles from ZIP {zip}
                </div>
              )}
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selected.address + ", " + selected.city + ", " + selected.state)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="xa-cta-gold mt-3"
            style={{ minHeight: 40, fontSize: 13 }}
          >
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </div>
      )}

      <h2 className="text-sm font-bold text-stone-900 mb-2 mt-4">All Locations ({XPS_LOCATIONS.length})</h2>
      <div className="space-y-2">
        {XPS_LOCATIONS.map((loc, i) => (
          <button
            key={`${loc.city}-${i}`}
            onClick={() => setSelected(loc)}
            className={`w-full text-left p-3 rounded-xl border-2 transition ${selected?.city === loc.city && selected?.state === loc.state ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-stone-900">{loc.city}, {loc.state}</div>
                <div className="text-xs text-stone-500">{loc.address}</div>
              </div>
              {loc.hq && <span className="text-[9px] font-bold text-amber-600 uppercase">HQ</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}