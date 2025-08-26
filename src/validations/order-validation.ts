import z from "zod";

export const orderMenuFormSchema = z.object({
  menu_id: z.string().min(1, "Bahwa menu diperlukan"),
  quantity: z.string().min(1, "Jumlah dibutuhkan"),
});

export const orderFormSchema = z.object({
  customer_id: z.string().optional(),
  catatan: z.string().optional(),
  status: z.string().min(1, "Pilih status"),
  items: z.array(orderMenuFormSchema).min(1, "Setidaknya satu menu harus dipilih"),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
