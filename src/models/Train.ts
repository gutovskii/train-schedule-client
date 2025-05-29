import { Stop } from "./Stop";

export type Train = {
    id: string;
    trainNumber: string;

    createdAt: Date;
    updatedAt: Date;

    stops: Stop[];
}
