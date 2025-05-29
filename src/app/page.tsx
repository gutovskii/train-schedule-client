'use client';

import '@ant-design/v5-patch-for-react-19';
import LayoutHeader from "@/components/LayoutHeader/LayoutHeader";
import Schedule from "@/components/Schedule/Schedule";
import { useUserInit } from "@/hooks/useUserInit";
import { Layout } from "antd";

export default function Home() {
  useUserInit();

  return (
    <div>
      <Layout>
        <Layout.Content className='h-[100vh]'>
          <LayoutHeader />
          <Schedule />
        </Layout.Content>
      </Layout>
    </div>
  );
}
