"use client";

import logo from "@/public/inventory.jpg";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";
import NavModal from "../../../_components/common/NavModal";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { decodeToken } from "@/utils/config/decode";

const DashboardTopbar = () => {
  const [openNavModal, setOpenNavModal] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  // const token = Cookies.get("access_token");
  // const user = token && decodeToken(token);
  const [user, setUser] = useState<{ lastName: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setUser(decodeToken(token));
    }
  }, []);

  const toggleNavModal = () => {
    setOpenNavModal(!openNavModal);
  };

  const toggleLogoutModal = () => {
    setOpenLogout(!openLogout);
  };
  return (
    <div className="fixed z-50 top-0 right-0 lg:left-[15.3rem] left-0 p-2 flex justify-between items-center px-5 md:px-10 lg:px-5 bg-[#cce2f3] shadow-sm">
      <div className="flex items-center gap-2">
        <Menu
          className="lg:hidden text-black text-2xl cursor-pointer"
          onClick={toggleNavModal}
        />
        <h1 className="text-base lg:text-lg font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-2 py-1 px-1 md:px-2 border rounded-md">
        <div className="lg:h-10 lg:w-10 h-5 w-5 sm:h-8 sm:w-8 rounded-full overflow-hidden">
          <Image
            width={320}
            height={320}
            alt="image"
            src={logo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          {user ? (
            <>
              <h1 className="font-bold text-xs sm:text-base ">
                {user?.lastName}
              </h1>
              <p className="text-[12px] sm:text-sm">
                {user?.role?.toLowerCase()}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div></div>
        <ChevronDown
          onClick={toggleLogoutModal}
          className={`${openLogout ? "rotate-180" : ""} cursor-pointer`}
        />
      </div>
      {openLogout && <LogoutModal toggleLogout={toggleLogoutModal} />}
      <AnimatePresence>
        {openNavModal && <NavModal toggleNavModal={toggleNavModal} />}
      </AnimatePresence>
    </div>
  );
};

export default DashboardTopbar;
