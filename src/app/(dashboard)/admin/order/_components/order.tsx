"use client";

import DataTable from "@/common/data-table";
import DropdownAction from "@/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { cn, convertIDR } from "@/lib/utils";
import { HEADER_TABLE_ORDER } from "@/constants/order-constant";
import DialogCreateOrder from "./dialog-create-order";
import { useRouter } from "next/navigation";

export default function OrderManagement() {
  const supabase = createClient();
  const router = useRouter();

  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
  } = useDataTable();

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const query = supabase
        .from("orders")
        .select(
          `
            id, order_id, customers (name, id), total_harga, catatan, status, created_at
            `,
          { count: "exact" }
        )
        .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
        .order("created_at", { ascending: false });

      if (currentSearch) {
        query.or(
          `order_id.ilike.%${currentSearch}%,created_at.ilike.%${currentSearch}%`
        );
      }

      const result = await query;

      if (result.error)
        toast.error("Get Order data failed", {
          description: result.error.message,
        });

      return result;
    },
  });

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const result = await supabase
        .from("customers")
        .select("*")
        .order("created_at")
        .order("name", { ascending: true });

      return result.data;
    },
  });

  const { data: menus } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const result = await supabase
        .from("menus")
        .select("*")
        .order("created_at")
        .order("name", { ascending: true });

      return result.data;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    type: "update" | "delete";
  } | null>(null);

  const handleChangeAction = (open: boolean) => {
    if (!open) setSelectedAction(null);
  };

  const filteredData = useMemo(() => {
    return (orders?.data || []).map((order, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        order.order_id,
        (order.customers as unknown as { name: string }).name,
        convertIDR(order.total_harga),
        order.catatan || "-",
        <div
          className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
            "bg-lime-600": order.status === "lunas",
            "bg-sky-600": order.status === "proses",
            "bg-red-600": order.status === "batal",
          })}
        >
          {order.status}
        </div>,
        <DropdownAction
          menu={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  Detail
                </div>
              ),
              action: () => router.push(`/admin/order/${order.order_id}`),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <Pencil size={16} />
                  Update
                </div>
              ),
              action: () => console.log("Update order", order.order_id),
            },
            {
              label: (
                <div className="flex items-center gap-2 text-red-600">
                  <Trash2 size={16} />
                  Delete
                </div>
              ),
              variant: "destructive",
              action: () => console.log("Delete order", order.order_id),
            },
          ]}
        />,
      ];
    });
  }, [orders, router, currentLimit, currentPage]);

  const totalPages = useMemo(() => {
    return orders && orders.count !== null
      ? Math.ceil(orders.count / currentLimit)
      : 0;
  }, [orders, currentLimit]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search..."
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
            <DialogCreateOrder
              customers={customers}
              menus={menus}
              refetch={refetch}
            />
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_ORDER}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
}
