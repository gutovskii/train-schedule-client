import axiosInstance from "@/axios";

export const DEFAULT_STATIONS_SEARCH_LIMIT = 5;

export const stationsService = {
    async getStations(search: string, take = DEFAULT_STATIONS_SEARCH_LIMIT) {
        return (await axiosInstance.get("stations", {
            params: {
                search,
                take,
            }
        })).data;
    },
}