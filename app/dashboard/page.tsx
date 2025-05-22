"use client";

import { isAdmin, isAGENCY } from "@/utils/config/isValidRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardComponent from "./_components/DashboardComponent";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAdmin() || isAGENCY()) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [router]);

  return <DashboardComponent />;
};

export default Dashboard;
