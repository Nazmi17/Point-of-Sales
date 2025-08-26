import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateCustomer } from "../actions";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import FormCustomer from "./form-customer";
import { Dialog } from "@radix-ui/react-dialog";
import {
  Customer,
  CustomerForm,
  customerFormSchema,
} from "@/validations/customer-validation";
import { INITIAL_STATE_CUSTOMER } from "@/constants/customer-constant";

export default function DialogUpdateCustomer({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Customer;
  open?: boolean;
  handleChangeAction?: (open: boolean) => void;
}) {
  const form = useForm<CustomerForm>({
    resolver: zodResolver(customerFormSchema),
  });

  const [updateCustomerState, updateCustomerAction, isPendingUpdateCustomer] =
    useActionState(updateCustomer, INITIAL_STATE_CUSTOMER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image_url") {
        // hanya append kalau ada file baru
        if (preview?.file) {
          formData.append("image_url", preview.file);
        }
      } else {
        formData.append(key, value);
      }
    });

    if (currentData?.image_url) {
      formData.append("old_image_url", currentData.image_url);
    }

    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateCustomerAction(formData);
    });
  });

  useEffect(() => {
    if (updateCustomerState?.status === "error") {
      toast.error("Update Pelanggan Gagal", {
        description: updateCustomerState.errors?._form?.[0],
      });
    }

    if (updateCustomerState?.status === "success") {
      toast.success("Update Pelanggan Berhasil");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateCustomerState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("telp", currentData.telp?.toString() ?? "");
      form.setValue("address", currentData.address ?? "");
      form.setValue("image_url", currentData.image_url ?? "");

      if (currentData.image_url) {
        setPreview({
          file: undefined, 
          displayUrl: currentData.image_url as string,
        });
      } else {
        setPreview(undefined);
      }
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormCustomer
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateCustomer}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
}
