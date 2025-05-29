'use client';

import { Button, Dropdown, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { DatabaseOutlined, LogoutOutlined } from "@ant-design/icons";
import { authService } from "@/services/auth.service";

export default function LayoutHeader() {
    const user = useStore((state) => state.user);
    const router = useRouter();

    const userDropdownItems: MenuProps['items'] = [
        {
            key: 1,
            icon: <DatabaseOutlined />,
            label: 'Admin panel',
            onClick: () => router.push('/admin'),  
            disabled: !user?.isAdmin,
        },
        {
            key: 2,
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
            onClick: () => {
                authService.logout();
                router.push('/login');
            },
        }
    ];

    return <Header className="flex justify-between items-center">
        <div className="text-3xl text-white">
            TRAIN SCHEDULE
        </div>
        <div className="cursor-default">
            {user ? 
                <Dropdown menu={{ items: userDropdownItems }}>
                    <div className=" text-white">Hello, <span className="font-bold">{user.username}</span>, hover me</div>
                </Dropdown> : 
                <Button onClick={() => router.push('/login')}>Login</Button>
            }
        </div>
    </Header>
}