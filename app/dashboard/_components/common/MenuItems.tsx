import Link from "next/link";
import { ReactNode } from "react";

interface MenuItemsItem {
  name: string;
  icon: ReactNode;
  path: string;
}

interface MenuItemsProps {
  items: MenuItemsItem[];
  pathname: string;
}

const MenuItems = ({ items, pathname }: MenuItemsProps) => (
  <ul className="space-y-2 flex-1">
    {items.map((item) => (
      <li key={item.name}>
        <Link
          href={item.path}
          className={`block ${
            pathname === item.path ? "border-l-4 border-blue-500" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 p-3 rounded-sm transition-all duration-300 ease-in-out ${
              pathname === item.path
                ? "bg-blue-500/10 text-blue-500"
                : "hover:cursor-pointer hover:bg-blue-500/10"
            }`}
          >
            <span className="text-lg lg:text-base 2xl:text-lg text-black">
              {item.icon}
            </span>
            <span className="text-lg lg:text-base 2xl:text-lg">
              {item.name}
            </span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default MenuItems;
