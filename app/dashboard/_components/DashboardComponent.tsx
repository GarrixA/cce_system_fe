"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { FiBox, FiUsers } from "react-icons/fi";
import StatCard from "./StatCard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DashboardComponent = () => {
  const totalUsers = 45;

  const borrowingStats = {
    labels: [
      "Categories",
      "Organizations",
      "Roles",
      "Users",
      "Compliants",
      "Reports",
    ],
    series: [
      {
        name: "Number of Users",
        data: [10, 70, 40],
      },
    ],
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, borderRadius: 1, columnWidth: "50%" },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: borrowingStats.labels },
    yaxis: { title: { text: "Number of Users" } },
    responsive: [{ breakpoint: 600, options: { chart: { height: 350 } } }],
  };

  return (
    <div className="p-6 min-h-screen w-full">
      <h1 className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={FiBox}
          title="Total Compliants"
          value={20}
          color="text-blue-600"
        />
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={totalUsers}
          color="text-green-600"
        />
      </div>

      <div className="bg-white shadow-md border rounded-lg p-6 w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4"> Status</h2>
        <div className="w-full" style={{ height: "calc(100vh - 300px)" }}>
          <ReactApexChart
            options={chartOptions}
            series={borrowingStats.series}
            type="bar"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
