import axiosInstance from "@/axios";
import type { UserPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

type AuthResponse = {
    accessToken: string;
}

export type LoginValues = {
    username: string;
    password: string;
}

export type RegisterValues = {
    username: string;
    password: string;
}

export const authService = {
    async login({ username, password }: LoginValues) {
        const response = await axiosInstance.post<AuthResponse>("/auth/login", {
            username,
            password,
        });

        localStorage.setItem("token", response.data.accessToken);

        const decoded = jwtDecode<UserPayload>(response.data.accessToken);
        
        return decoded;
    },
    async register({ username, password }: RegisterValues) {
        const response = await axiosInstance.post<AuthResponse>("/auth/register", {
            username, 
            password,
        });

        localStorage.setItem("token", response.data.accessToken);

        const decoded = jwtDecode<UserPayload>(response.data.accessToken);

        return decoded;
    },
    async logout() {
        localStorage.removeItem("token");
    },
    async findUserByToken() {
        return (await axiosInstance.get("/auth/user")).data;
    }
}