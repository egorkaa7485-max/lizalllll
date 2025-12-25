import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertWishlistItem, type WishlistItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useWishlist() {
  return useQuery({
    queryKey: [api.wishlist.list.path],
    queryFn: async () => {
      const res = await fetch(api.wishlist.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return api.wishlist.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateWishlistItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertWishlistItem) => {
      const validated = api.wishlist.create.input.parse(data);
      const res = await fetch(api.wishlist.create.path, {
        method: api.wishlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create item");
      }
      return api.wishlist.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.wishlist.list.path] });
      toast({ title: "Success", description: "Item added to wishlist" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.wishlist.delete.path, { id });
      const res = await fetch(url, { 
        method: api.wishlist.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.wishlist.list.path] });
      toast({ title: "Success", description: "Item removed from wishlist" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
