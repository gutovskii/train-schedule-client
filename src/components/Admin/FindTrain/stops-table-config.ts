import { TableProps } from "antd";

export const stopsTableColumns: TableProps['columns'] = [
    {
        title: 'Station name',
        dataIndex: 'stationName',
        key: 'stationName',
    },
    {
        title: 'Arrival Time',
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        render: (text: string) => new Date(text).toLocaleString(),
    },
    {
        title: 'Departure Time',
        dataIndex: 'departureTime',
        key: 'departureTime',
        render: (text: string) => new Date(text).toLocaleString(),
    }
];