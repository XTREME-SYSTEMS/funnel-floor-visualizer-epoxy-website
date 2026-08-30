import React, { useState, useEffect } from "react";
import {
  User, Mail, Phone, MapPin, Shield, Star, Bell,
  LogOut, ChevronRight, Award, FileText,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        setProject(projects[0]);
      } catch (err) {
        console.error("Settings load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-4">
      <div>
        <h1 className="text-lg font-black text-stone-900">Settings</h1>
        <p className="text-xs text-stone-500">Your account & preferences</p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ background: GOLD_GRADIENT, border: "2px solid #000" }}
          >
            <User className="h-7 w-7 text-stone-900" />
          </div>
          <div>
            <div className="text-base font-black text-stone-900">{user?.full_name || "Client"}</div>
            <div className="text-xs text-stone-500">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-3">
        <h2 className="text-sm font-bold text-stone-900">Contact Information</h2>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-amber-600 shrink-0" />
          <span className="text-sm text-stone-700">{user?.email || "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-amber-600 shrink-0" />
          <span className="text-sm text-stone-700">Add phone number</span>
        </div>
        {project?.address && (
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="text-sm text-stone-700">{project.address}</span>
          </div>
        )}
      </div>

      {/* Project & warranty */}
      {project && (
        <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-2">
          <h2 className="text-sm font-bold text-stone-900">Project & Warranty</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-600" />
              <span className="text-xs text-stone-600">Floor System</span>
            </div>
            <span className="text-xs font-semibold text-stone-900">
              {project.floor_system || "Epoxy"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600" />
              <span className="text-xs text-stone-600">Warranty</span>
            </div>
            <span className="text-xs font-semibold text-stone-900">
              {project.warranty_expiration
                ? new Date(project.warranty_expiration).toLocaleDateString()
                : "Active"}
            </span>
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
        <button className="w-full flex items-center gap-3 p-4 border-b border-stone-100">
          <Bell className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-stone-700 flex-1 text-left">Notifications</span>
          <ChevronRight className="h-4 w-4 text-stone-400" />
        </button>
        <button className="w-full flex items-center gap-3 p-4 border-b border-stone-100">
          <Star className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-stone-700 flex-1 text-left">Rate Our Service</span>
          <ChevronRight className="h-4 w-4 text-stone-400" />
        </button>
        <button className="w-full flex items-center gap-3 p-4">
          <Award className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-stone-700 flex-1 text-left">Loyalty Points</span>
          <span className="text-xs font-bold text-amber-600">0 pts</span>
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border border-stone-200 bg-white text-stone-600"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>

      <p className="text-center text-[10px] text-stone-400 pb-2">
        XPS Client Care · Above & Beyond · v1.0
      </p>
    </div>
  );
}