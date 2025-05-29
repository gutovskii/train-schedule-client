'use client';

import { authService, LoginValues } from "@/services/auth.service";
import { useStore } from "@/store";
import { NestError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Typography } from "antd";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const setUser = useStore((state) => state.setUser);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: ({ username, password }: LoginValues) => {
            return authService.login({ username, password });
        },
        onSuccess(data) {
            setUser(data);
            router.push('/');
        },
        onError(error: AxiosError<NestError>) {
            message.error(error.response?.data.message, 3);
        },
    });

    const onFinish = async (values: LoginValues) => {
        mutation.mutate(values);
    }

    return <div className="flex flex-col md:flex-row justify-center w-full items-center h-[100vh] gap-10">
        <Typography.Title color="white">TRAIN SCHEDULE</Typography.Title>
        <Form
            name="login"
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
                    Login
                </Button>
            </Form.Item>

            <Typography.Text>
                No profile yet? <Link href={'/register'} className="text-blue-500">Register!</Link>
            </Typography.Text>
        </Form>
    </div>
}