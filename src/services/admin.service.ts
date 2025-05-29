import axiosInstance from "@/axios";
import { CreateTrainFormValues } from "@/components/Admin/CreateTrain/CreateTrain";

export const DEFAULT_STATIONS_SEARCH_LIMIT = 5;

export const adminService = {
    async findTrain(search: string) {
        return (await axiosInstance.get("/admin/trains/" + search)).data;
    },
    async findTrains(search: string, take = DEFAULT_STATIONS_SEARCH_LIMIT) {
        return (await axiosInstance.get("/admin/trains", {
            params: {
                search,
                take
            }
        })).data;
    },
    async createTrain(trainToCreate: CreateTrainFormValues) {
        return (await axiosInstance.post("/admin/trains", trainToCreate)).data;
    },
    async deleteTrain(trainNumber: string) {
        return (await axiosInstance.delete(`/admin/trains/${trainNumber}`)).data;
    },
    async updateTrain(oldTrainNumber: string, newTrainNumber: string) {
        return (await axiosInstance.put("/admin/trains", { oldTrainNumber, newTrainNumber })).data;
    }
};