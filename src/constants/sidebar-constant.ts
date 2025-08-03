import {
  Album,
  Armchair,
  LayoutDashboard,
  SquareMenu,
  Users,
} from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  superadmin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Transaksi",
      url: "/order",
      icon: Album,
    },
    {
      title: "Barang",
      url: "/admin/menu",
      icon: SquareMenu,
    },
    {
      title: "Table",
      url: "/admin/table",
      icon: Armchair,
    },
    {
      title: "Karyawan",
      url: "/admin/user",
      icon: Users,
    },
  ],
  kasir: [],
  gudang: [],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
