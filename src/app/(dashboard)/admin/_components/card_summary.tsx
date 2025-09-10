"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { convertIDR } from "@/lib/utils";

export default function SummaryCards() {
  const supabase = createClient();

  // ambil total pemasukan
  const { data: totalPemasukan } = useQuery({
    queryKey: ["total-pemasukan"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pemasukan")
        .select("jumlah_pemasukan");
      if (error) throw error;
      return data?.reduce(
        (sum, item) => sum + Number(item.jumlah_pemasukan),
        0
      );
    },
  });

  // ambil total pengeluaran
  const { data: totalPengeluaran } = useQuery({
    queryKey: ["total-pengeluaran"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pengeluaran")
        .select("jumlah_pengeluaran");
      if (error) throw error;
      return data?.reduce(
        (sum, item) => sum + Number(item.jumlah_pengeluaran),
        0
      );
    },
  });

  const saldo = (totalPemasukan || 0) - (totalPengeluaran || 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Card Pemasukan */}
      <Card className="shadow-md md:w-52">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {convertIDR(totalPemasukan || 0)}
          </div>
        </CardContent>
      </Card>

      {/* Card Pengeluaran */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Pengeluaran
          </CardTitle>
          <TrendingDown className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {convertIDR(totalPengeluaran || 0)}
          </div>
        </CardContent>
      </Card>

      {/* Card Saldo */}
      <Card className="shadow-md bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          <DollarSign className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{convertIDR(saldo)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
