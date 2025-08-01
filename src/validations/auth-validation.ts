import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, "Silahkan isi email anda")
    .email("Tolong masukkan email yang valid"),
  password: z.string().min(1, "Silahkan masukkan password anda"),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
