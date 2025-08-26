"use server";

import { createClient } from "@/lib/supabase/server";
import { OrderFormState } from "@/types/order";
import { orderFormSchema } from "@/validations/order-validation";

export async function createOrder(
  prevState: OrderFormState,
  formData: FormData
): Promise<OrderFormState> {
  const validatedFields = orderFormSchema.safeParse({
    customer_id: formData.get("customer_id"),
    catatan: formData.get("catatan"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      formStatus: "error",
      errors: {
        customer_id:
          validatedFields.error.flatten().fieldErrors.customer_id ?? [],
        catatan: validatedFields.error.flatten().fieldErrors.catatan ?? [],
        status: validatedFields.error.flatten().fieldErrors.status ?? [],
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const orderId = `NZPUTRA-${Date.now()}`; // bisa diganti UUID kalau perlu lebih aman

  const { error: orderError } = await supabase.from("orders").insert({
    order_id: orderId,
    customer_id: Number(validatedFields.data.customer_id),
    catatan: validatedFields.data.catatan,
    status: validatedFields.data.status,
  });

  if (orderError) {
    return {
      formStatus: "error",
      errors: {
        ...prevState.errors,
        _form: [orderError.message],
      },
    };
  }

  return {
    formStatus: "success",
    errors: { customer_id: [], catatan: [], status: [], _form: [] },
  };
}
