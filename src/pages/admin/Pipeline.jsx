import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { base44 } from "@/api/base44Client";
import { money } from "@/lib/pricing";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/tracking";

const STAGES = ["NEW ESTIMATE", "CONTACT ATTEMPTED", "CONSULTATION BOOKED", "CONSULTATION COMPLETED", "IN-HOME ESTIMATE BOOKED", "IN-HOME ESTIMATE COMPLETED", "PROPOSAL SENT", "WON", "LOST", "NURTURE"];

const STAGE_EVENT = {
  "PROPOSAL SENT": "proposal_sent",
  "IN-HOME ESTIMATE BOOKED": "home_visit_booked",
  WON: "won",
  LOST: "lost"
};

export default function Pipeline() {
  const qc = useQueryClient();
  const { data: leads = [] } = useQuery({ queryKey: ["leads"], queryFn: () => base44.entities.Lead.list("-created_date", 500) });

  const onDragEnd = async (result) => {
    const { destination, draggableId, source } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    const status = destination.droppableId;
    await base44.entities.Lead.update(draggableId, { status });
    if (STAGE_EVENT[status]) trackEvent(STAGE_EVENT[status], { lead_id: draggableId });
    qc.invalidateQueries({ queryKey: ["leads"] });
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Sales pipeline</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const items = leads.filter((l) => l.status === stage);
            return (
              <Droppable droppableId={stage} key={stage}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="w-72 shrink-0 bg-stone-200/60 rounded-2xl p-3">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <span className="text-xs font-bold tracking-wide text-stone-600">{stage}</span>
                      <span className="text-xs text-stone-500">{items.length}</span>
                    </div>
                    <div className="space-y-2 min-h-[60px]">
                      {items.map((l, i) => (
                        <Draggable draggableId={l.id} index={i} key={l.id}>
                          {(p) => (
                            <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className="rounded-xl bg-white border border-stone-200 p-3">
                              <Link to={`/admin/leads/${l.id}`} className="font-medium text-sm text-stone-900 hover:underline">
                                {l.first_name} {l.last_name}
                              </Link>
                              <div className="text-xs text-stone-500 mt-1">{l.city} · {l.square_footage} sq ft</div>
                              <div className="text-xs font-semibold text-stone-900 mt-2 tabular-nums">
                                {money(l.estimate_low)} – {money(l.estimate_high)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}