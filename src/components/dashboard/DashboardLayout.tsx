import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-24 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-60 left-60 w-12 h-12 bg-rose-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-60 right-60 w-14 h-14 bg-cyan-300 rounded-full opacity-20 animate-bounce"></div>

      <div className="flex h-screen relative z-10">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-16">
          <Header onMenuClick={() => setOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
