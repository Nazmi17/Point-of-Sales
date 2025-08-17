import DialogDelete from "@/common/dialog-delete";
import { startTransition, useActionState, useEffect } from "react";
import { deleteCustomer } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { Customer } from "@/validations/customer-validation";

export default function DialogDeleteCustomer({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Customer;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteCustomerState, deleteCustomerAction, isPendingDeleteCustomer] =
    useActionState(deleteCustomer, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    if (!currentData?.id) return;

    const formData = new FormData();
    formData.append("id", currentData.id as string);

    if (currentData.image_url) {
      formData.append("image_url", currentData.image_url);
    }

    startTransition(() => {
      deleteCustomerAction(formData);
    });
  };

  useEffect(() => {
    if (deleteCustomerState?.status === "error") {
      toast.error("Hapus Customer Gagal", {
        description: deleteCustomerState.errors?._form?.[0],
      });
    }

    if (deleteCustomerState?.status === "success") {
      toast.success("Hapus Customer Sukses");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteCustomerState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteCustomer}
      onSubmit={onSubmit}
      title="Menu"
    />
  );
}
