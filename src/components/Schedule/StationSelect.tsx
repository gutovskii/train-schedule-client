import { Station } from "@/models/Station";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { useState } from "react";
import debounce from "lodash.debounce";
import { stationsService } from "@/services/stations.service";

export interface StationSelectProps {
    placeholder: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function StationSelect({ placeholder, onChange, defaultValue = '' }: StationSelectProps) {
    const [searchValue, setSearchValue] = useState('');

    const stationQuery = useQuery<Station[]>({
        queryKey: ['stations', searchValue],
        queryFn: async () => {
            const stations = await stationsService.getStations(searchValue);
            return stations;
        },
        refetchOnWindowFocus: false,
        refetchInterval: false,
        enabled: Boolean(searchValue),
    });

    const debouncedSearch = debounce((newValue: string) => {
        setSearchValue(newValue);
        stationQuery.refetch();
    }, 300);

    const handleSearch = (newValue: string) => {
        debouncedSearch(newValue);
    };

    return (
        <Select
            className="!w-35"
            showSearch
            placeholder={placeholder || "Select a station"}
            options={(stationQuery.data || [] as Station[]).map(s => ({
                label: s.name,
                value: s.name,
            }))}
            defaultValue={defaultValue}
            onSearch={handleSearch}
            onChange={onChange}
            notFoundContent={'No stations found'}
            loading={stationQuery.isLoading}
        />
    );
}