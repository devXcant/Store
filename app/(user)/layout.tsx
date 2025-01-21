"use client";
import Loader from "@/components/Admin/Loader";

import Sidebar from "@/components/Admin/Sidebar";
import Footer from "@/components/Frontend/Footer";
import LoginUI from "@/components/Frontend/Login";
import { useAppSelector } from "@/lib/hook";
import { useSession } from "next-auth/react";
import React from "react";

const layout = ({children}: {children:React.ReactNode}) => {
  const isLoading = useAppSelector((store) => store.loadingSlice);
  const { data: session } = useSession();

  if (!session?.user) {
    return <LoginUI  />;
  }

    return <div className="flex">
        {/* <Sidebar /> */}
        <div className="w-full h-full">
            {/* <Navbar /> */}
        <div className="bg-black p-4 h-[calc(100vh -64px)]">{children}</div>
        {/* <Footer /> */}
        </div>
        {isLoading && <Loader />}
  </div>;
};

export default layout;
