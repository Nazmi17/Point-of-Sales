import {
  Album,
  Armchair,
  LayoutDashboard,
  SquareMenu,
  Users,
} from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Transaksi",
      url: "/transaksi",
      icon: Album,
    },
    {
      title: "Barang",
      url: "/admin/barang",
      icon: SquareMenu,
    },
    {
      title: "Table",
      url: "/admin/table",
      icon: Armchair,
    },
    {
      title: "Karyawan",
      url: "/admin/karyawan",
      icon: Users,
    },
  ],
  kasir: [],
  gudang: [],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
