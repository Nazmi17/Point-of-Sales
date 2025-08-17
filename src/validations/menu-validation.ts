import z from "zod";

export const menuFormSchema = z.object({
  name: z.string().min(1, "Nama dibutuhkan"),
  description: z.string().min(1, "Deskripsi dibutuhkan"),
  price: z.string().min(1, "Harga dibutuhkan"),
  discount: z.string().min(1, "Diskon dibutuhkan (Jika tidak ada diskon masukkan '0')"),
  category: z.string().min(1, "Kategori dibutuhkan"),
  image_url: z.union([
    z.string().min(1, "Gambar dibutuhkan"),
    z.instanceof(File),
  ]),
  is_available: z.string().min(1, "Ketersediaan dibutuhkan"),
});

export const menuSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  category: z.string(),
  image_url: z.union([z.string(), z.instanceof(File)]),
  is_available: z.boolean(),
});

export type MenuForm = z.infer<typeof menuFormSchema>;
export type Menu = z.infer<typeof menuSchema> & { id: string };
