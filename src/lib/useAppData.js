import { useState, useEffect, useCallback } from "react";

// LocalStorage-backed app state for the Epoxy Pro Guide app.
// Persists saved floor visualizations, instant-bid estimates, and
// appointment / proposal-tracking data so everything "stays in the app."
const KEY = "epoxy_pro_guide_v1";

const DEFAULT_TIMELINE = [
  { key: "requested", label: "Estimate requested", detail: "You submitted your project details", status: "done" },
  { key: "scheduled", label: "In-home visit scheduled", detail: "Pick a time that works for you", status: "upcoming" },
  { key: "reminder", label: "Day-before reminder", detail: "We'll text you a confirmation", status: "pending" },
  { key: "day_of", label: "Day-of confirmation", detail: "Your specialist is on the way", status: "pending" },
  { key: "en_route", label: "Estimator en route", detail: "Live arrival update", status: "pending" },
  { key: "arrived", label: "Estimator arrived", detail: "Your in-home estimate begins", status: "pending" },
  { key: "proposal", label: "Proposal delivered", detail: "Your written quote is ready", status: "pending" }
];

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { savedFloors: [], estimate: null, appointment: null, timeline: DEFAULT_TIMELINE };
    const data = JSON.parse(raw);
    return {
      savedFloors: data.savedFloors || [],
      estimate: data.estimate || null,
      appointment: data.appointment || null,
      timeline: data.timeline || DEFAULT_TIMELINE
    };
  } catch {
    return { savedFloors: [], estimate: null, appointment: null, timeline: DEFAULT_TIMELINE };
  }
}

export function useAppData() {
  const [state, setState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const addFloor = useCallback((floor) => {
    setState((s) => ({
      ...s,
      savedFloors: [{ id: `floor_${Date.now()}`, createdAt: new Date().toISOString(), ...floor }, ...s.savedFloors]
    }));
  }, []);

  const removeFloor = useCallback((id) => {
    setState((s) => ({ ...s, savedFloors: s.savedFloors.filter((f) => f.id !== id) }));
  }, []);

  const setEstimate = useCallback((estimate) => {
    setState((s) => ({ ...s, estimate }));
  }, []);

  const setAppointment = useCallback((appointment) => {
    setState((s) => {
      const timeline = s.timeline.map((step) =>
        step.key === "scheduled" ? { ...step, status: "done" } :
        step.key === "reminder" ? { ...step, status: "upcoming" } : step
      );
      return { ...s, appointment, timeline };
    });
  }, []);

  return { ...state, addFloor, removeFloor, setEstimate, setAppointment };
}