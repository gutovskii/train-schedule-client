import { Button, Form, Input, message, Typography } from "antd";
import TrainDetails from "./TrainDetails";
import { AxiosError } from "axios";
import { NestError } from "@/types";
import { adminService } from "@/services/admin.service";
import { useState } from "react";
import { Train } from "@/models/Train";

export type FindTrainFormValues = {
    trainNumber: string;
}

export default function FindTrain() {
    const [findTrainForm] = Form.useForm<FindTrainFormValues>();

    const [selectedTrain, setSelectedTrain] = useState<Train | undefined>(undefined);

    const handleFindTrain = async () => {
        const validatedValues = await findTrainForm.validateFields();
        try {
            const train = await adminService.findTrain(validatedValues.trainNumber);
            setSelectedTrain(train);
        } catch (error: unknown) {
            message.error((error as AxiosError<NestError>).response?.data.message);
        }
    }
    
    return <div className="w-full md:w-[600px]">
        <Typography.Title level={4}>Find Train</Typography.Title>
        <Form
            form={findTrainForm}
            onFinish={handleFindTrain}
        >
            <Form.Item
                className="w-full md:w-[400px]"
                name="trainNumber"
                rules={[{ required: true, message: 'Train number is required' }]}
            >
                <Input placeholder="Find the train by train number" />
            </Form.Item>
            <Button htmlType="submit" type="primary">Find Train</Button>
        </Form>
        <Typography.Title level={5}>Selected Train</Typography.Title>
        <TrainDetails train={selectedTrain} setTrain={setSelectedTrain} />
    </div>
}