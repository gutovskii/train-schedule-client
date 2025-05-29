'use client';

import { DatePicker, Select, Table, Typography } from "antd";
import { scheduleTableColumns } from "./schedule-table-config";
import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/hooks/useFilters";
import dayjs from "dayjs";
import { scheduleService } from "@/services/schedule.service";
import { ScheduleParams } from "@/types";
import StationSelect from "./StationSelect";

export default function Schedule() {
    const { filters, setFilter } = useFilters<ScheduleParams>({
        fromStation: '',
        toStation: '',
        arrivalDate: '',
        sortOrder: 'ASC',
        sortBy: 'arrival',
    });

    const trainScheduleQuery = useQuery({
        queryKey: ['trainSchedule', filters],
        queryFn: async () => {
            const schedules = await scheduleService.findAll(filters);
            return schedules;
        },
        refetchOnWindowFocus: false,
        enabled: Boolean(filters.fromStation && filters.toStation && filters.arrivalDate),
    });

    return (
        <div className="w-full md:w-[1000px] mx-auto mt-15 px-5 md:px-0">
            <div className="mr-3">
                <Typography.Title level={4} className="inline-block mr-2">
                    Arrival Date:
                </Typography.Title>
                <DatePicker 
                    defaultValue={filters.arrivalDate ? dayjs(filters.arrivalDate) : undefined}
                    onChange={(date) => {
                        const dateString = date ? date.toISOString() : '';
                        setFilter('arrivalDate', dateString);
                    }}
                    showNow={false}
                />
            </div>
            <div className="flex">
                <div className="mr-3">
                    <Typography.Title level={4} className="inline-block mr-2">
                        From:
                    </Typography.Title>
                    <StationSelect 
                        placeholder="From Station"
                        defaultValue={filters.fromStation}
                        onChange={(value) => {
                            setFilter('fromStation', value);
                        }}
                    />
                </div>
                <div className="mr-3">
                    <Typography.Title level={4} className="inline-block mr-2">
                        To:
                    </Typography.Title>
                    <StationSelect 
                        placeholder="To Station"
                        defaultValue={filters.toStation}
                        onChange={(value) => {
                            setFilter('toStation', value);
                        }}
                    />
                </div>
            </div>
            <div className="flex">
                <div className="mr-3">
                    <Typography.Title level={4} className="inline-block mr-2">
                        Sort Order:
                    </Typography.Title>
                    <Select 
                        defaultValue={filters.sortOrder}
                        onChange={(value) => {
                            setFilter('sortOrder', value);
                        }}
                        className="w-[120px] mb-4"
                    >
                        <Select.Option value="ASC">Ascending</Select.Option>
                        <Select.Option value="DESC">Descending</Select.Option>
                    </Select>
                </div>
                <div className="mr-3">
                    <Typography.Title level={4} style={{ display: 'inline-block', marginRight: 8 }}>
                        Sort By:
                    </Typography.Title>
                    <Select 
                        defaultValue={filters.sortBy}
                        onChange={(value) => {
                            setFilter('sortBy', value);
                        }}
                        className="w-[120px] mb-4"
                    >
                        <Select.Option value="arrival">Arrival</Select.Option>
                        <Select.Option value="departure">Departure</Select.Option>
                    </Select>
                </div>
            </div>
            <Table 
                columns={scheduleTableColumns}
                dataSource={trainScheduleQuery.data}
                rowKey={(schedule) => schedule.trainNumber}
                loading={trainScheduleQuery.isLoading}
                pagination={false}
            />
        </div>
    );
}