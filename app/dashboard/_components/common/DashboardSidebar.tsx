"use client";

import logo from "@/public/inventory.jpg";
import { isAdmin } from "@/utils/config/isValidRole";
import { UserCheck } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBox,
  FaChartBar,
  FaHistory,
  FaList,
  FaTachometerAlt,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import MenuItems from "./MenuItems";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Items", icon: <FaBox />, path: "/dashboard/items" },
  { name: "Categories", icon: <FaList />, path: "/dashboard/categories" },
  { name: "Users", icon: <FaUsers />, path: "/dashboard/users" },
  {
    name: "Organizations",
    icon: <FaUserFriends />,
    path: "/dashboard/organizations",
  },
  { name: "History", icon: <FaHistory />, path: "/dashboard/history" },
  { name: "Reports", icon: <FaChartBar />, path: "/dashboard/reports" },
];
const adminMenuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Roles", icon: <UserCheck />, path: "/dashboard/roles" },
  { name: "Compliants", icon: <FaBox />, path: "/dashboard/compliants" },
  { name: "Categories", icon: <FaList />, path: "/dashboard/categories" },
  { name: "Users", icon: <FaUsers />, path: "/dashboard/users" },
  {
    name: "Organizations",
    icon: <FaUserFriends />,
    path: "/dashboard/organizations",
  },
  { name: "History", icon: <FaHistory />, path: "/dashboard/history" },
  { name: "Reports", icon: <FaChartBar />, path: "/dashboard/reports" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isAdminStatus, setIsAdminStatus] = useState(false);

  useEffect(() => {
    setIsAdminStatus(isAdmin());
  }, []);

  return (
    <div className="bg-[#cce2f3] p-3 fixed left-0 top-0 h-full w-64 hidden lg:block">
      <div className=" bg-[#cce2f3] h-screen text-gray-800 shadow-lg flex flex-col px-5 rounded-md">
        <div className="flex items-center justify-center my-4 py-2 gap-2 rounded-md shadow-sm">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              alt="Logo"
              width={80}
              height={80}
              src={logo}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl lg:text-lg 2xl:text-xl font-black">CCE_SY</h1>
        </div>

        <ul className="space-y-2 flex-1">
          <MenuItems
            items={isAdminStatus ? adminMenuItems : menuItems}
            pathname={pathname}
          />
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
