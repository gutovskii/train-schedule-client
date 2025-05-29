'use client';

import { authService, RegisterValues } from "@/services/auth.service";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const setUser = useStore(state => state.setUser);

    const router = useRouter();

    const mutation = useMutation({
        mutationFn(values: RegisterValues) {
            return authService.register(values);
        },
        onSuccess(data) {
            setUser(data);
            router.push('/');
        },
        onError(error) {
            message.error(error.message);
        },
    });

    const onFinish = async (values: RegisterValues) => {
        mutation.mutate(values);
    }

    return <div className="flex flex-col md:flex-row justify-center w-full items-center h-[100vh] gap-10">
        <Typography.Title color="white">TRAIN SCHEDULER</Typography.Title>
        <Form
            layout="vertical"
            onFinish={onFinish}
            className="min-w-[90%] md:min-w-[50%] lg:min-w-[25%]"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Enter your username!'}]}
            >
                <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Enter your password!'}]}
            >
                <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    </div>
}