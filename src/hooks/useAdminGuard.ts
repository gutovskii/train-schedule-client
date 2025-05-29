import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAdminGuard = () => {
  const user = useStore(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    }
  }, []);
};