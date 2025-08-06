import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, "Alamat email dibutuhkan")
    .email("Masukkan alamat email yang valid"),
  password: z.string().min(1, "Kata sandi dibutuhkan"),
});

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "Alamat email dibutuhkan")
    .email("Masukkan alamat email yang valid"),
  password: z.string().min(1, "Kata sandi dibutuhkan"),
  name: z.string().min(1, "Nama dibutuhkan"),
  role: z.string().min(1, "Role dibutuhkan"),
  avatar_url: z.union([
    z.string().min(1, "URL gambar dibutuhkan"),
    z.instanceof(File),
  ]),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nama dibutuhkan"),
  role: z.string().min(1, "Peran dibutuhkan"),
  avatar_url: z.union([
    z.string().min(1, "URL gambar dibutuhkan"),
    z.instanceof(File),
  ]),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
