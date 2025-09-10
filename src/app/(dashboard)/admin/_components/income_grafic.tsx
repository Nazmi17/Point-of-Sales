"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
}

export default function IncomeExpenseChart() {
  const supabase = createClient();

  const { data: pemasukan } = useQuery({
    queryKey: ["pemasukan"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pemasukan")
        .select("jumlah_pemasukan, created_at")
        .order("created_at", { ascending: true });
      if (error) {
        toast.error("Gagal ambil data pemasukan", {
          description: error.message,
        });
        return [];
      }
      return data || [];
    },
  });

  const { data: pengeluaran } = useQuery({
    queryKey: ["pengeluaran"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pengeluaran")
        .select("jumlah_pengeluaran, created_at")
        .order("created_at", { ascending: true });
      if (error) {
        toast.error("Gagal ambil data pengeluaran", {
          description: error.message,
        });
        return [];
      }
      return data || [];
    },
  });

  const chartData = (() => {
    const map: Record<
      string,
      { date: string; pemasukan: number; pengeluaran: number }
    > = {};

    pemasukan?.forEach((p) => {
      const date = formatDate(p.created_at);
      if (!map[date]) map[date] = { date, pemasukan: 0, pengeluaran: 0 };
      map[date].pemasukan += Number(p.jumlah_pemasukan);
    });

    pengeluaran?.forEach((e) => {
      const date = formatDate(e.created_at);
      if (!map[date]) map[date] = { date, pemasukan: 0, pengeluaran: 0 };
      map[date].pengeluaran += Number(e.jumlah_pengeluaran);
    });

    return Object.values(map).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  })();

  const data = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Pemasukan",
        data: chartData.map((item) => item.pemasukan),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Pengeluaran",
        data: chartData.map((item) => item.pengeluaran),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { usePointStyle: true },
      },
      title: {
        display: true,
        text: "Grafik Pemasukan vs Pengeluaran",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] p-4 border rounded-lg bg-muted/30">
      <Line data={data} options={options} />
    </div>
  );
}
