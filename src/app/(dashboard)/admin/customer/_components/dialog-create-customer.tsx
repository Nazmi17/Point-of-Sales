import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createCustomer } from "../actions";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import { CustomerForm, customerFormSchema } from "@/validations/customer-validation";
import { INITIAL_CUSTOMER, INITIAL_STATE_CUSTOMER } from "@/constants/customer-constant";
import FormCustomer from "./form-customer";

export default function DialogCreateCustomer({ refetch }: { refetch: () => void }) {
  const form = useForm<CustomerForm>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: INITIAL_CUSTOMER,
  });

  const [createCustomerState, createCustomerAction, isPendingCreateCustomer] =
    useActionState(createCustomer, INITIAL_STATE_CUSTOMER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image_url") {
        // Kalau ada file baru, pakai file
        if (preview?.file) {
          formData.append(key, preview.file);
        } else if (typeof value === "string") {
          // Kalau tidak ada file baru, simpan string (URL lama atau kosong)
          formData.append(key, value);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    startTransition(() => {
      createCustomerAction(formData);
    });
  });


 useEffect(() => {
   if (createCustomerState?.status === "error") {
     const allErrors = Object.entries(createCustomerState.errors ?? {})
       .flatMap(
         ([field, messages]) => messages?.map((msg) => `${field}: ${msg}`) ?? []
       )
       .join("\n");

     toast.error("Buat Pelanggan Gagal", {
       description: allErrors || "Terjadi kesalahan yang tidak diketahui",
     });
   }

   if (createCustomerState?.status === "success") {
     toast.success("Buat Pelanggan Sukses");
     form.reset();
     setPreview(undefined);
     document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
     refetch();
   }
 }, [createCustomerState]);



  return (
    <FormCustomer
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateCustomer}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
