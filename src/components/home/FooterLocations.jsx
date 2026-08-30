import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronDown } from "lucide-react";
import {
  XPS_LOCATIONS,
  XPS_CANADA_LOCATIONS,
  XPS_INTERNATIONAL_LOCATIONS,
  XPS_COMING_SOON_LOCATIONS,
  REGION_MAP,
  getRegion,
} from "@/lib/xpsLocations";
import { locationPath } from "@/lib/seoConfig";

// Group US locations by region for the footer.
function groupByRegion(locations) {
  const groups = {};
  for (const loc of locations) {
    const region = getRegion(loc.state);
    if (!groups[region]) groups[region] = [];
    groups[region].push(loc);
  }
  return groups;
}

const REGION_ORDER = [
  "Florida", "Texas", "North East", "South East",
  "Central", "West", "Canada", "International",
];

export default function FooterLocations() {
  const [openRegion, setOpenRegion] = useState("Florida");
  const usGroups = groupByRegion(XPS_LOCATIONS);
  const allGroups = { ...usGroups };

  // Canada
  if (XPS_CANADA_LOCATIONS.length) {
    allGroups["Canada"] = XPS_CANADA_LOCATIONS;
  }
  // International
  if (XPS_INTERNATIONAL_LOCATIONS.length) {
    allGroups["International"] = XPS_INTERNATIONAL_LOCATIONS;
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <MapPin className="h-4 w-4" /> XPS Xpress Locations — 70+ Stores
      </h3>

      {/* Desktop: all regions in a grid; Mobile: collapsible accordions */}
      <div className="hidden md:grid md:grid-cols-3 gap-x-6 gap-y-4">
        {REGION_ORDER.map((region) => {
          const locs = allGroups[region];
          if (!locs || !locs.length) return null;
          return (
            <div key={region}>
              <div className="text-xs font-bold text-white uppercase mb-2">{region}</div>
              <ul className="space-y-1">
                {locs.map((loc) => (
                  <li key={`${loc.city}-${loc.state}`}>
                    <Link
                      to={locationPath(loc)}
                      className="text-xs text-stone-400 hover:text-amber-500 transition"
                    >
                      {loc.city}, {loc.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Mobile: collapsible by region */}
      <div className="md:hidden space-y-1">
        {REGION_ORDER.map((region) => {
          const locs = allGroups[region];
          if (!locs || !locs.length) return null;
          const isOpen = openRegion === region;
          return (
            <div key={region} className="border-b border-stone-800">
              <button
                onClick={() => setOpenRegion(isOpen ? "" : region)}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="text-xs font-bold text-white uppercase">{region} ({locs.length})</span>
                <ChevronDown className={`h-4 w-4 text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <ul className="pb-2 space-y-1">
                  {locs.map((loc) => (
                    <li key={`${loc.city}-${loc.state}`}>
                      <Link
                        to={locationPath(loc)}
                        className="text-xs text-stone-400 hover:text-amber-500 transition"
                      >
                        {loc.city}, {loc.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Coming Soon expansion cities */}
      <div className="mt-6 pt-4 border-t border-stone-800">
        <div className="text-xs font-bold text-white uppercase mb-2">Coming Soon — New Markets</div>
        <p className="text-xs text-stone-500 mb-2">
          Now open to motivated entrepreneurs, contractors, and industry professionals looking to grow with a trusted national brand.
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {XPS_COMING_SOON_LOCATIONS.map((loc) => (
            <span key={`${loc.city}-${loc.state}`} className="text-xs text-stone-500">
              {loc.city}, {loc.state}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}