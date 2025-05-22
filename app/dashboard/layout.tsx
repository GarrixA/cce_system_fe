"use client";

import { Provider } from "react-redux";
import DashboardSidebar from "./_components/common/DashboardSidebar";
import DashboardTopbar from "./_components/common/DashboardTopbar";
import { store } from "@/store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex bg-[#cce2f3]">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 lg:ml-64 ml-0">
        <DashboardTopbar />
        <Provider store={store}>
          <main className="flex-1 p- mt-16">{children}</main>
        </Provider>
      </div>
    </div>
  );
};

export default DashboardLayout;
