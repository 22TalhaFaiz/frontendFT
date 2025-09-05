import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/DashboardComponents/Navbar/DashBar";
import React from "react";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-900">
      <DashboardNavbar />
      
      <main className="flex-1 transition-all duration-300 ease-in-out
        w-full
        lg:ml-0 lg:w-[calc(100%-12rem)]
        xl:ml-0 xl:w-[calc(100%-16rem)]
      ">
        <div className="pt-6 px-4 lg:px-6 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;