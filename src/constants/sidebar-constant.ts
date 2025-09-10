import {
  Calculator,
  ChartColumnDecreasing,
  ChartColumnIncreasing,
  LayoutDashboard,
  PersonStanding,
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
      url: "/admin/order",
      icon: Calculator,
    },
    {
      title: "Barang",
      url: "/admin/menu",
      icon: SquareMenu,
    },
    {
      title: "Pelanggan",
      url: "/admin/customer",
      icon: PersonStanding,
    },
    {
      title: "Karyawan",
      url: "/admin/user",
      icon: Users,
    },
    {
      title: "Pemasukan",
      url: "/admin/pemasukan",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Pengeluaran",
      url: "/admin/pengeluaran",
      icon: ChartColumnDecreasing,
    },
  ],
  kasir: [],
  gudang: [],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;
