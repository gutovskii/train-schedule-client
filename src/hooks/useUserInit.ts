import { TOKEN_LOCAL_STORAGE_KEY } from "@/axios";
import { useStore } from "@/store";
import { UserPayload } from "@/types";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const useUserInit = () => {
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        setUser(decoded);
      } catch (error: unknown) {
        console.log(error);
        message.error('JWT Token is invalid');
      }
    } else {
      setUser(null);
    }
  }, []);
}