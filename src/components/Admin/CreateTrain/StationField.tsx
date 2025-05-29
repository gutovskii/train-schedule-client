import StationSelect from "@/components/Schedule/StationSelect"
import { CloseOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Input } from "antd"

export type StationFieldProps = {
    removeItem: (name: number) => void;
    stopOrder: number;
    name: number
}

export default function StationField({ removeItem, stopOrder, name }: StationFieldProps) {
    return <div className="flex gap-2 items-center">
        <Form.Item
            name={[name, 'stationName']}
            rules={[{ required: true, message: 'Station is required' }]}
        >
            <StationSelect 
                placeholder="Select station"
            />
        </Form.Item>

        <Form.Item
            name={[name, 'arrivalTime']}
            rules={[{ required: true, message: 'Arrival time required' }]}
        >
            <DatePicker showNow={false} showTime placeholder="Arrival time" />
        </Form.Item>

        <Form.Item
            name={[name, 'departureTime']}
            rules={[{ required: true, message: 'Departure time required' }]}
        >
            <DatePicker showNow={false} showTime placeholder="Departure time"/>
        </Form.Item>

        <Form.Item className="hidden" name={[name, 'stopOrder']} initialValue={stopOrder}>
            <Input disabled />
        </Form.Item>

        <Form.Item>
            <Button danger onClick={() => removeItem(name)}><CloseOutlined /></Button>
        </Form.Item>
    </div>
}