import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, Camera, MapPin, User, FileText } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

const STAGES = ["scheduled", "prep", "installation", "curing", "complete"];
const STAGE_LABELS = {
  scheduled: "Scheduled",
  prep: "Surface Prep",
  installation: "Installation",
  curing: "Curing",
  complete: "Complete",
};
const STAGE_DESC = {
  scheduled: "Your project is booked and the team is assigned.",
  prep: "Surface preparation — grinding, cleaning, and crack repair.",
  installation: "Epoxy application and flake broadcast in progress.",
  curing: "Floor is curing. Please avoid the area for 24-48 hours.",
  complete: "Your new floor is ready! Enjoy your transformed space.",
};

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function ProjectTracker() {
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        const p = projects[0];
        setProject(p);
        if (p) {
          const ups = await base44.entities.ProjectUpdate.filter({ project_id: p.id });
          setUpdates(ups);
        }
      } catch (err) {
        console.error("ProjectTracker error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-4 text-center">
        <FileText className="h-12 w-12 text-stone-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-stone-700">No project found</p>
        <p className="text-xs text-stone-500 mt-1">
          Your project will appear here once it's scheduled.
        </p>
      </div>
    );
  }

  const currentStageIdx = STAGES.indexOf(project.status);

  return (
    <div className="p-3 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg font-black text-stone-900">Project Tracker</h1>
        <p className="text-xs text-stone-500">Live updates every step of the way</p>
      </div>

      {/* Project info card */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-stone-900">{project.address || "Your Project"}</div>
            <div className="text-xs text-stone-500">
              {[project.city, project.state, project.zip].filter(Boolean).join(", ")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-stone-900">
              {project.floor_system || "Epoxy Floor System"}
            </div>
            {project.flake_color_name && (
              <div className="text-xs text-stone-500">Color: {project.flake_color_name}</div>
            )}
            {project.square_footage && (
              <div className="text-xs text-stone-500">{project.square_footage} sq ft</div>
            )}
          </div>
        </div>
        {project.assigned_team?.length > 0 && (
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Your Team</div>
              <div className="text-xs text-stone-500">{project.assigned_team.join(", ")}</div>
            </div>
          </div>
        )}
      </div>

      {/* Stage timeline */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4">
        <h2 className="text-sm font-bold text-stone-900 mb-3">Project Stages</h2>
        <div className="space-y-3">
          {STAGES.map((stage, i) => {
            const isDone = i < currentStageIdx;
            const isCurrent = i === currentStageIdx;
            const isFuture = i > currentStageIdx;
            return (
              <div key={stage} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={
                      isDone || isCurrent
                        ? { background: GOLD_GRADIENT, border: "1.5px solid #000" }
                        : { background: "#f5f5f5", border: "1.5px solid #e5e5e5" }
                    }
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-stone-900" />
                    ) : isCurrent ? (
                      <Clock className="h-4 w-4 text-stone-900" />
                    ) : (
                      <span className="text-xs text-stone-400 font-bold">{i + 1}</span>
                    )}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div
                      className="w-0.5 h-6"
                      style={{ background: isDone ? "#D4AF37" : "#e5e5e5" }}
                    />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <div
                    className="text-sm font-bold"
                    style={{ color: isFuture ? "#9CA3AF" : "#1a1a1a" }}
                  >
                    {STAGE_LABELS[stage]}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{STAGE_DESC[stage]}</p>
                  {isCurrent && project.status !== "complete" && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Updates feed */}
      {updates.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-stone-900 mb-2">Project Updates</h2>
          <div className="space-y-2">
            {updates.map((up) => (
              <div key={up.id} className="rounded-xl bg-white border border-stone-200 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-stone-900">{up.title}</span>
                  <span className="text-[9px] text-stone-400">
                    {new Date(up.created_date).toLocaleDateString()}
                  </span>
                </div>
                {up.description && (
                  <p className="text-xs text-stone-500">{up.description}</p>
                )}
                {up.photo_url && (
                  <div className="mt-2 rounded-lg overflow-hidden h-32">
                    <Image
                      src={up.photo_url}
                      alt="Project update"
                      className="w-full h-full"
                      fittingType="fill"
                    />
                  </div>
                )}
                <div className="mt-1 text-[9px] text-amber-600 font-semibold">
                  {STAGE_LABELS[up.stage] || up.stage} · {up.author_name || "Team"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before / After */}
      {(project.before_photos?.length > 0 || project.after_photos?.length > 0) && (
        <div>
          <h2 className="text-sm font-bold text-stone-900 mb-2">Before & After</h2>
          <div className="grid grid-cols-2 gap-2">
            {project.before_photos?.map((photo, i) => (
              <div key={`before-${i}`} className="rounded-xl overflow-hidden border border-stone-200">
                <div className="relative h-28">
                  <Image src={photo} alt="Before" className="w-full h-full" fittingType="fill" />
                  <span className="absolute top-1 left-1 text-[8px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                    BEFORE
                  </span>
                </div>
              </div>
            ))}
            {project.after_photos?.map((photo, i) => (
              <div key={`after-${i}`} className="rounded-xl overflow-hidden border border-stone-200">
                <div className="relative h-28">
                  <Image src={photo} alt="After" className="w-full h-full" fittingType="fill" />
                  <span className="absolute top-1 left-1 text-[8px] font-bold text-stone-900 px-1.5 py-0.5 rounded" style={{ background: GOLD_GRADIENT }}>
                    AFTER
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}