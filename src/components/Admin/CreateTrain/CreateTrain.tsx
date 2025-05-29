import { Button, Form, Input, message, Typography } from "antd";
import { adminService } from "@/services/admin.service";
import { AxiosError } from "axios";
import { NestError } from "@/types";
import StationField from "./StationField";

export type CreateTrainFormValues = {
    trainNumber: string;
    stops: {
        stationName: string;
        arrivalTime: Date;
        departureTime: Date;
        stopOrder: number;
    }[];
}

export default function CreateTrain() {
    const [createTrainForm] = Form.useForm<CreateTrainFormValues>();
    
    const handleCreateTrain = async () => {
        const validatedValues = await createTrainForm.validateFields();
        try {
            await adminService.createTrain(validatedValues);
            message.success('Train successfully created!');
        } catch (error: unknown) {
            message.error((error as AxiosError<NestError>).response?.data.message);
        }
    }

    return <div>
        <Typography.Title level={4}>Create Train</Typography.Title>
        <Form
            form={createTrainForm}
            layout="vertical"
            onFinish={handleCreateTrain}
        >
            <Form.Item
                className="w-full md:w-[400px]"
                label="Train number"
                name="trainNumber"
                rules={[{ required: true, message: 'Train number is required' }]}
            >
                <Input placeholder="Train Number" />
            </Form.Item>
            <Form.List name="stops" rules={[
                {
                    validator: async (_, stops) => {
                        if (!stops || stops.length < 2) {
                            return Promise.reject(new Error('At least 2 stops are required'));
                        }
                    }
                }
            ]}>
                {(fields, { add, remove }, { errors }) => (
                    <>
                        <div className="flex flex-col gap-2">
                            {fields.map(({ key, name }, index) => (
                                <StationField
                                    key={key}
                                    stopOrder={index + 1}
                                    name={name}
                                    removeItem={remove}
                                />
                            ))}
                        </div>
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()}>Add stop</Button>
                        </Form.Item>
                        <Form.ErrorList className="text-red-500" errors={errors} />
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button htmlType="submit" type="primary">Create train</Button>
            </Form.Item>
        </Form>
    </div>
}