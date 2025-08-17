import z from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(1, "Nama dibutuhkan"),
  telp: z.string().optional(),
  address: z.string().optional(),
  image_url: z.union([
    z.string(),
    z.instanceof(File),
  ]).optional(),
});

export const customerSchema = z.object({
  name: z.string(),
  telp: z.number().optional(),
  address: z.string().optional(),
  image_url: z.union([
    z.string(),
    z.instanceof(File),
  ]).optional(),
});

export type CustomerForm = z.infer<typeof customerFormSchema>;
export type Customer = z.infer<typeof customerSchema> & { id: string };
