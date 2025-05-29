import { TableProps } from "antd";

export const scheduleTableColumns: TableProps['columns'] = [
    {
        title: 'Train Number',
        dataIndex: 'trainNumber',
        key: 'trainNumber',
    },
    {
        title: 'Departure Station',
        dataIndex: 'fromStation',
        key: 'fromStation',
    },
    {
        title: 'Arrival Station',
        dataIndex: 'toStation',
        key: 'toStation',
    },
    {
        title: 'Departure Time',
        dataIndex: 'fromDepartureTime',
        key: 'fromDepartureTime',
        render: (text: string) => new Date(text).toLocaleString(),
    },
    {
        title: 'Arrival Time',
        dataIndex: 'toArrivalTime',
        key: 'toArrivalTime',
        render: (text: string) => new Date(text).toLocaleString(),
    },
];