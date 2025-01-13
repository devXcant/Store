"use client";
import Loader from "@/components/Admin/Loader";
import Login from "@/components/Admin/Login";
import Sidebar from "@/components/Admin/Sidebar";
import { useAppSelector } from "@/lib/hook";
import { useSession } from "next-auth/react";
import React from "react";

const layout = ({children}: {children:React.ReactNode}) => {
  const isLoading = useAppSelector((store) => store.loadingSlice);
  const { data: session } = useSession();

  if (!session?.user) {
    return <Login  />;
  }

    return <div className="flex">
        <Sidebar />
        <div className="w-full h-full">
            {/* <Navbar /> */}
            <div className="bg-gray-200 p-4 h-[calc(100vh -64px)]">{children}</div>
        </div>
        {isLoading && <Loader />}
  </div>;
};

export default layout;
