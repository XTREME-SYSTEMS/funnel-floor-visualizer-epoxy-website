import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

export function useSettings() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["app-settings"],
    queryFn: async () => {
      const rows = await base44.entities.AppSettings.list("-created_date", 1);
      return rows[0] || null;
    }
  });
  return { settings: { ...DEFAULT_SETTINGS, ...(data || {}) }, record: data, isLoading, refetch };
}