import axiosInstance from "@/axios";
import { Schedule } from "@/models/Schedule";
import { ScheduleParams } from "@/types";

export const scheduleService = {
    async findAll(params: ScheduleParams): Promise<Schedule[]> {
        return (await axiosInstance.get("schedule", { params })).data;
    },
};