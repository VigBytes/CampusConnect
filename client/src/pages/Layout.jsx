import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { dummyUserData } from "./../assets/assets";
import Loading from "../components/Loading";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = dummyUserData;

  return user ? (
    <div className="w-full flex h-screen overflow-hidden bg-[#eee4d0]">

      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto bg-[#f8f3e8]">
        {/* Subtle top border */}
        <div className="h-[3px] bg-[#651d2b]" />

        <Outlet />
      </main>

      {/* Mobile Menu Button */}
      {sidebarOpen ? (
        <button onClick={() => setSidebarOpen(false)} className="fixed top-4 right-4 z-100 sm:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#f8f3e8] border border-[#d5c6ae] text-[#651d2b] shadow-md hover:bg-[#eee4d0] transition">
          <X className="w-5 h-5" />
        </button>
      ) : (
        <button onClick={() => setSidebarOpen(true)} className="fixed top-4 right-4 z-100 sm:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#651d2b] text-[#f8f3e8] shadow-md hover:bg-[#4f1621] transition">
          <Menu className="w-5 h-5" />
        </button>
      )}

    </div>
  ) : (
    <Loading />
  );
};

export default Layout;