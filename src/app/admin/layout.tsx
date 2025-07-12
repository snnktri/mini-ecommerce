import Sidebar from "@/components/admin/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    // Layout Component
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AdminLayout;
