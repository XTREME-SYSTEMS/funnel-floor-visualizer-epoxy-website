import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList, MessageSquare, Image as ImageIcon, Calendar,
  Gift, Sparkles, Shield, ArrowRight, CheckCircle2, Clock,
  Bell, Star,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { XTREME_AI_ICON_URL } from "@/components/Logo";
import { Image } from "@/components/ui/image";

const STAGES = ["scheduled", "prep", "installation", "curing", "complete"];
const STAGE_LABELS = {
  scheduled: "Scheduled",
  prep: "Surface Prep",
  installation: "Installation",
  curing: "Curing",
  complete: "Complete",
};

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const projects = await base44.entities.ClientProject.filter({
          client_email: me.email,
        });
        const activeProject = projects[0];
        setProject(activeProject);
        if (activeProject) {
          const ups = await base44.entities.ProjectUpdate.filter({
            project_id: activeProject.id,
          });
          setUpdates(ups);
        }
        const refs = await base44.entities.Referral.filter({
          referrer_email: me.email,
        });
        setReferrals(refs);
      } catch (err) {
        console.error("CareHome load error", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  const currentStageIdx = project ? STAGES.indexOf(project.status) : -1;
  const progress = project ? ((currentStageIdx + 1) / STAGES.length) * 100 : 0;
  const completedReferrals = referrals.filter((r) => r.status === "completed").length;

  return (
    <div className="p-3 space-y-4">
      {/* Welcome */}
      <div className="text-center pt-2">
        <div className="w-14 h-14 mx-auto overflow-hidden">
          <Image src={XTREME_AI_ICON_URL} alt="XPS" className="w-full h-full" fittingType="fit" />
        </div>
        <h1 className="text-lg font-black text-stone-900 mt-1">
          Welcome, {user?.full_name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-xs text-stone-500">Your project care hub — always in the loop</p>
      </div>

      {/* Active project status */}
      {project ? (
        <div className="rounded-2xl bg-stone-900 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <ClipboardList className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Your Project</span>
            </div>
            <span className="text-[10px] text-stone-400">{project.project_type}</span>
          </div>
          <div className="text-sm font-bold text-white">{project.address || project.city}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">
            {project.floor_system || "Epoxy Floor System"}
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[9px] text-stone-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FFF6D5, #D4AF37)" }}
              />
            </div>
          </div>

          {/* Stage pills */}
          <div className="flex justify-between mt-3">
            {STAGES.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={
                    i <= currentStageIdx
                      ? { background: GOLD_GRADIENT, border: "1.5px solid #000", color: "#1a1a1a" }
                      : { background: "#1f1f1f", border: "1.5px solid #333", color: "#666" }
                  }
                >
                  {i < currentStageIdx ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                </div>
                <span className="text-[7px] text-stone-400 text-center leading-tight">
                  {STAGE_LABELS[s]}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/care/project")}
            className="mt-3 w-full h-9 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-stone-900"
            style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-stone-200 p-4 text-center">
          <ClipboardList className="h-8 w-8 text-stone-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-stone-700">No active project yet</p>
          <p className="text-xs text-stone-500 mt-1">
            Once your project is scheduled, you'll see live updates here.
          </p>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: MessageSquare, label: "Message", path: "/care/messages" },
          { icon: ImageIcon, label: "Gallery", path: "/care/gallery" },
          { icon: Calendar, label: "Schedule", path: "/care/schedule" },
          { icon: Gift, label: "Refer", path: "/care/referral" },
        ].map((a, i) => (
          <button
            key={i}
            onClick={() => navigate(a.path)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center"
              style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
            >
              <a.icon className="h-5 w-5 text-stone-900" strokeWidth={2} />
            </div>
            <span className="text-[9px] font-bold text-stone-700">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Latest update */}
      {updates.length > 0 && (
        <div className="rounded-2xl bg-white border border-stone-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Bell className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-stone-900">Latest Update</span>
          </div>
          <div className="text-sm font-semibold text-stone-900">{updates[0].title}</div>
          <p className="text-xs text-stone-500 mt-1">{updates[0].description}</p>
          {updates[0].photo_url && (
            <div className="mt-2 rounded-xl overflow-hidden h-32">
              <Image
                src={updates[0].photo_url}
                alt="Update"
                className="w-full h-full"
                fittingType="fill"
              />
            </div>
          )}
        </div>
      )}

      {/* Referral progress */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, #FFF6D5, #F0DB8A)" }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Gift className="h-5 w-5 text-amber-700" />
          <span className="text-sm font-black text-amber-800">Refer & Earn</span>
        </div>
        <p className="text-xs text-amber-900 mb-2">
          Refer 5 friends — get a custom cleaning kit + 1 year of special solution!
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-amber-200 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(completedReferrals / 5) * 100}%`, background: GOLD_GRADIENT }}
            />
          </div>
          <span className="text-xs font-bold text-amber-900">{completedReferrals}/5</span>
        </div>
        <button
          onClick={() => navigate("/care/referral")}
          className="mt-3 w-full h-9 rounded-xl bg-amber-800 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          Invite Friends <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Care reminder + warranty */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white border border-stone-200 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="text-[10px] font-bold text-stone-900">Care Tip</span>
          </div>
          <p className="text-[10px] text-stone-500 leading-snug">
            Seasonal re-seal check coming up. See your maintenance plan.
          </p>
        </div>
        <div className="rounded-xl bg-white border border-stone-200 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="h-4 w-4 text-amber-600" />
            <span className="text-[10px] font-bold text-stone-900">Warranty</span>
          </div>
          <p className="text-[10px] text-stone-500 leading-snug">
            {project?.warranty_expiration
              ? `Valid until ${new Date(project.warranty_expiration).toLocaleDateString()}`
              : "Active — see settings"}
          </p>
        </div>
      </div>
    </div>
  );
}