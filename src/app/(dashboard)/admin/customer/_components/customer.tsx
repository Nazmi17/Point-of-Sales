"use client";

import DataTable from "@/common/data-table";
import DropdownAction from "@/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Customer } from "@/validations/customer-validation";
import Image from "next/image";
import { cn, convertIDR } from "@/lib/utils";
import { HEADER_TABLE_CUSTOMER } from "@/constants/customer-constant";
import DialogCreateCustomer from "./dialog-create-customer";
import DialogUpdateCustomer from "./dialog-update-customer";
import DialogDeleteCustomer from "./dialog-delete-customer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomerManagement() {
  const supabase = createClient();
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
  } = useDataTable();
  const {
    data: customers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["customers", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const query = supabase
        .from("customers")
        .select("*", { count: "exact" })
        .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
        .order("created_at");

      if (currentSearch) {
        query.or(
          `name.ilike.%${currentSearch}%`
        );
      }

      const result = await query;

      if (result.error)
        toast.error("Gagal mengambil data", {
          description: result.error.message,
        });

      return result;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: Customer;
    type: "update" | "delete";
  } | null>(null);

  const handleChangeAction = (open: boolean) => {
    if (!open) setSelectedAction(null);
  };

  const filteredData = useMemo(() => {
    return (customers?.data || []).map((customer: Customer, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={customer.image_url} alt={customer.name} />
            <AvatarFallback className="rounded-lg">
              {customer.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {customer.name}
        </div>,
        customer.telp,
        customer.address,
        <DropdownAction
          menu={[
            {
              label: (
                <span className="flex item-center gap-2">
                  <Pencil />
                  Edit
                </span>
              ),
              action: () => {
                setSelectedAction({
                  data: customer,
                  type: "update",
                });
              },
            },
            {
              label: (
                <span className="flex item-center gap-2">
                  <Trash2 className="text-red-400" />
                  Hapus
                </span>
              ),
              variant: "destructive",
              action: () => {
                setSelectedAction({
                  data: customer,
                  type: "delete",
                });
              },
            },
          ]}
        />,
      ];
    });
  }, [customers]);

  const totalPages = useMemo(() => {
    return customers && customers.count !== null
      ? Math.ceil(customers.count / currentLimit)
      : 0;
  }, [customers]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Cari menu berdasarkan nama atau kategori"
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Buat user</Button>
            </DialogTrigger>
            <DialogCreateCustomer refetch={refetch} />
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_CUSTOMER}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
      <DialogUpdateCustomer
        open={selectedAction !== null && selectedAction.type === "update"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      />
      <DialogDeleteCustomer
        open={selectedAction !== null && selectedAction.type === "delete"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      />
    </div>
  );
}
