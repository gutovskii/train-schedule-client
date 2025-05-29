import { Train } from "@/models/Train"
import { Input, message, Modal, Table, Typography } from "antd";
import { useState } from "react";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { adminService } from "@/services/admin.service";
import { NestError } from "@/types";
import { AxiosError } from "axios";
import { stopsTableColumns } from "./stops-table-config";

export type TrainDetailsProps = {
    train?: Train,
    setTrain: (train: Train | undefined) => void
}

export default function TrainDetails({ train, setTrain }: TrainDetailsProps) {
    const [isChangingTrainNumber, setIsChangingTrainNumber] = useState(false);
    const [trainNumberToChange, setTrainNumberToChange] = useState(train?.trainNumber || '');

    const updateTrain = async () => {
        if (!train) return;
        try {
            await adminService.updateTrain(train.trainNumber, trainNumberToChange);
            const newTrain = await adminService.findTrain(trainNumberToChange);
            setTrain(newTrain);
            setIsChangingTrainNumber(false);
        }
        catch (error: unknown) {
            message.error((error as AxiosError<NestError>).response?.data.message);
        }
    }

    const deleteTrain =  () => {
        if (!train) return;
        Modal.confirm({
            title: `Are you sure you want to delete the train ${train.trainNumber}?`,
            async onOk() {
                try {
                    await adminService.deleteTrain(train.trainNumber);
                    setTrain(undefined);
                    setIsChangingTrainNumber(false);
                } catch (error: unknown) {
                    message.error((error as AxiosError<NestError>).response?.data.message);
                }
            }
        });
    }

    return train ? <div>
        <div className="flex items-center gap-2">
            {isChangingTrainNumber ? 
                <Input 
                    className="w-full md:!w-[400px]"
                    value={trainNumberToChange}
                    onChange={e => setTrainNumberToChange(e.target.value)} 
                /> : 
                <Typography.Title level={3}>{train.trainNumber}</Typography.Title>
            }
            <div onClick={() => setIsChangingTrainNumber(!isChangingTrainNumber)} className="cursor-pointer">
                {isChangingTrainNumber ? <CloseOutlined className="!text-black" /> : <EditOutlined className="!text-blue-500" />}
            </div>
            {isChangingTrainNumber ? <CheckOutlined className="!text-green-500" onClick={updateTrain} /> : null}
            <div onClick={deleteTrain} className="cursor-pointer">
                <DeleteOutlined className="!text-red-500" />
            </div>
        </div>
        <div>
            <Table 
                className="w-full md:w-[500px] mt-1"
                size="small"
                columns={stopsTableColumns}
                dataSource={train.stops}
                rowKey={(stop) => stop.id}
                pagination={false}
            />
        </div>
    </div> : <div className="text-gray-500">No train</div>
}