export type UserPayload = {
    id: string;
    username: string;
    isAdmin: boolean;
}

export type ScheduleParams = {
    fromStation: string,
    toStation: string,
    arrivalDate: string,
    sortOrder: 'ASC' | 'DESC',
    sortBy: 'departure' | 'arrival',
}

export type NestError = {
    message: string;
    error: string;
    statusCode: number;
}