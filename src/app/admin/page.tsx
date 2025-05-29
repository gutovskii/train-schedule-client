'use client';

import CreateTrain from "@/components/Admin/CreateTrain/CreateTrain";
import FindTrain from "@/components/Admin/FindTrain/FindTrain";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    useAdminGuard();

    const router = useRouter();

    return <div className="p-5">
        <div className="fixed top-3 right-3">
            <Button type="primary" onClick={() => router.push('/')}>Return home</Button>
        </div>
        <CreateTrain />
        <FindTrain />
    </div>;
}