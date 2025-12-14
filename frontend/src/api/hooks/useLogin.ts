import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useAuthStore } from "@/features/auth/auth.store";
import { queryKeys } from "../queryKeys";
import { queryClient } from "../queryClient";

interface LoginPayload {
  identifier: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await api.post("/auth/login", data);
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data: any) => {
      useAuthStore.getState().login(
        data.user,
        data.token,
      );

      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}
