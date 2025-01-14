import React from "react";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoSettings } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: <RiShoppingCartLine />,
    href: "/admin/products",
  },
  {
    title: "Accounts",
    icon: <MdManageAccounts />,
    href: "#",
  },
  {
    title: "Transactions",
    icon: <GrTransaction />,
    href: "#",
  },
  {
    title: "Analytics",
    icon: <IoAnalytics />,
    href: "#",
  },
  {
    title: "Settings",
    icon: <IoSettings />,
    href: "#",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-black border-[#D2EAC5] border-r border-b rounded-[10px] w-[300px] min-h-sreen p-4 shrink-0 font-urbanist">
      <div className="flex items-center gap-4">
        <img src="/logo.jpg" alt="logo" className="size-12 rounded-lg" />
        <h2 className="text-[20px] leading-[40px] font-bold font-urbanist">Admin Panel</h2>
      </div>

      <ul className="space-y-4 mt-6">
        {menus.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-200 hover:to-green-500 hover:text-white ${
              pathName === menu.href ? "bg-gradient-to-r from-green-500 to-green-700 text-white" : "bg-gblack border"
            }`}
          >
            <div className="text-[20px]">{menu.icon}</div>
            <div className="text-[15px]">{menu.title}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
