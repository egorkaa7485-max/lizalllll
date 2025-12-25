import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertPickupPoint, type PickupPoint } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function usePickupPoints() {
  return useQuery({
    queryKey: [api.pickupPoints.list.path],
    queryFn: async () => {
      const res = await fetch(api.pickupPoints.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch pickup points");
      return api.pickupPoints.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePickupPoint() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertPickupPoint) => {
      const validated = api.pickupPoints.create.input.parse(data);
      const res = await fetch(api.pickupPoints.create.path, {
        method: api.pickupPoints.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create pickup point");
      }
      return api.pickupPoints.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pickupPoints.list.path] });
      toast({ title: "Success", description: "Pickup point added" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeletePickupPoint() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.pickupPoints.delete.path, { id });
      const res = await fetch(url, { 
        method: api.pickupPoints.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete pickup point");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pickupPoints.list.path] });
      toast({ title: "Success", description: "Pickup point removed" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
