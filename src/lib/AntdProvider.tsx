import { ConfigProvider } from "antd";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: {} // you can customize Ant Design theme here
            }}
        >
            {children}
        </ConfigProvider>
    );
}