// "use client";
//pp

// import DataTable from "@/common/data-table";
// import { Button } from "@/components/ui/button";
// import { HEADER_TABLE_DETAIL_ORDER } from "@/constants/order-constant";
// import useDataTable from "@/hooks/use-data-table";
// import { createClient } from "@/lib/supabase/client";
// import { cn, convertIDR } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import Link from "next/link";
// import { useMemo } from "react";
// import { toast } from "sonner";

// export default function DetailOrder({ id }: { id: string }) {
//   const supabase = createClient();
//   const { currentPage, currentLimit, handleChangePage, handleChangeLimit } =
//     useDataTable();

//   // ambil data orders
//   const { data: order } = useQuery({
//     queryKey: ["order", id],
//     queryFn: async () => {
//       const result = await supabase
//         .from("orders")
//         .select(
//           "id, order_id, customers (id, name), status, catatan, total_harga"
//         )
//         .eq("order_id", id)
//         .single();

//       if (result.error)
//         toast.error("Get Order data failed", {
//           description: result.error.message,
//         });

//       return result.data;
//     },
//     enabled: !!id,
//   });

//   const { data: orderMenu, isLoading: isLoadingOrderMenu } = useQuery({
//     queryKey: ["orders_menus", order?.id, currentPage, currentLimit],
//     queryFn: async () => {
//       const result = await supabase
//         .from("orders_menus")
//         .select(
//           "id, nama_barang, harga_per_unit, quantity, subtotal, notes, menus (image_url)",
//           { count: "exact" }
//         )
//         .eq("order_id", order?.id);

//       if (result.error)
//         toast.error("Get order menu data failed", {
//           description: result.error.message,
//         });

//       return result;
//     },
//     enabled: !!order?.id,
//   });

//   // mapping untuk DataTable
//   const filteredData = useMemo(() => {
//     return (orderMenu?.data || []).map((item, index) => [
//       currentLimit * (currentPage - 1) + index + 1,
//       <div className="flex items-center gap-2">
//         {item.menus?.[0]?.image_url && (
//           <Image
//             src={item.menus[0].image_url}
//             alt={item.nama_barang}
//             width={40}
//             height={40}
//             className="rounded"
//           />
//         )}
//         <div className="flex flex-col">
//           {item.nama_barang} x {item.quantity}
//           <span className="text-xs text-muted-foreground">
//             {item.notes || "No Notes"}
//           </span>
//         </div>
//       </div>,
//       convertIDR(item.harga_per_unit),
//       convertIDR(item.subtotal),
//     ]);
//   }, [orderMenu?.data, currentPage, currentLimit]);

//   const totalPages = useMemo(() => {
//     return orderMenu && orderMenu.count !== null
//       ? Math.ceil(orderMenu.count / currentLimit)
//       : 0;
//   }, [orderMenu, currentLimit]);

//   return (
//     <div className="w-full space-y-4">
//       <div className="flex items-center justify-between gap-4 w-full">
//         <h1 className="text-2xl font-bold">Detail Order</h1>
//       </div>

//       {/* info order singkat */}
//       {order && (
//         <div className="p-4 border rounded-lg bg-muted/30 space-y-2">
//           <p>
//             <strong>Order ID:</strong> {order.order_id}
//           </p>
//           {order.customers && order.customers.length > 0 && (
//             <p>
//               <strong>Customer:</strong> {order.customers[0].name}
//             </p>
//           )}
//           <p>
//             <strong>Total Harga:</strong> {convertIDR(order.total_harga)}
//           </p>
//           {order.catatan && (
//             <p>
//               <strong>Catatan:</strong> {order.catatan}
//             </p>
//           )}
//         </div>
//       )}

//       <div className="flex flex-col lg:flex-row gap-4 w-full">
//         <div className="lg:w-2/3">
//           <DataTable
//             header={HEADER_TABLE_DETAIL_ORDER}
//             data={filteredData}
//             isLoading={isLoadingOrderMenu}
//             totalPages={totalPages}
//             currentPage={currentPage}
//             currentLimit={currentLimit}
//             onChangePage={handleChangePage}
//             onChangeLimit={handleChangeLimit}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
