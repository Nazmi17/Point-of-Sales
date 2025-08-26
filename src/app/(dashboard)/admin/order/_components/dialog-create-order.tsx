import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../actions";
import { toast } from "sonner";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_CREATE_ORDER,
} from "@/constants/order-constant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Customer } from "@/validations/customer-validation";
import { Menu } from "@/validations/menu-validation";
import { Form } from "@/components/ui/form";
import FormInput from "@/common/form-input";
import FormSelect from "@/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export default function DialogCreateOrder({
  refetch,
  customers,
  menus,
}: {
  refetch: () => void;
  customers: Customer[] | undefined | null;
  menus: Menu[] | undefined | null;
}) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: { ...INITIAL_ORDER, items: [] },
  });

  const supabase = createClient();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  const onSubmit = form.handleSubmit(async (data) => {
    const items = data.items.map((item) => {
      const menu = menus?.find((m) => Number(m.id) === Number(item.menu_id));
      const harga_per_unit = menu?.price ?? 0;
      const nama_barang = menu?.name ?? "";
      const quantity = Number(item.quantity);

      if (!menus) {
        toast.error("Daftar menu belum siap, coba lagi.");
        return;
      }

      return {
        menu_id: Number(item.menu_id),
        nama_barang,
        quantity,
        harga_per_unit,
        subtotal: harga_per_unit * quantity,
      };
    });

    const { data: newOrder, error } = await supabase.rpc(
      "create_order_with_items",
      {
        p_customer_id: Number(data.customer_id),
        p_status: data.status,
        p_catatan: data.catatan,
        p_items: items,
      }
    );

    if (error) {
      toast.error("Gagal Membuat Order", { description: error.message });
    } else {
      toast.success("Berhasil Membuat Order");
      form.reset();
      refetch(); // refresh daftar order
    }
  });


  useEffect(() => {
    if (createOrderState?.formStatus === "error") {
      toast.error("Gagal Membuat Order", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState?.formStatus === "success") {
      toast.success("Berhasil Membuat Order");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createOrderState]);

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>
            Tambahkan pesanan baru untuk customer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Bagian Header Order */}
          <div className="space-y-4">
            <FormSelect
              form={form}
              name="customer_id"
              label="Customer"
              selectItem={(customers ?? []).map((c) => ({
                value: `${c.id}`,
                label: c.name,
              }))}
            />
            <FormInput
              form={form}
              name="catatan"
              label="Catatan"
              placeholder="Tambahkan catatan (opsional)"
            />
            <FormSelect
              form={form}
              name="status"
              label="Status"
              selectItem={STATUS_CREATE_ORDER}
            />
          </div>

          {/* Bagian Order Items */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg">Daftar Pesanan</h3>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-end border p-3 rounded-md"
              >
                <FormSelect
                  form={form}
                  name={`items.${index}.menu_id`}
                  label="Menu"
                  selectItem={(menus ?? []).map((m) => ({
                    value: `${m.id}`,
                    label: m.name,
                  }))}
                />
                <FormInput
                  form={form}
                  name={`items.${index}.quantity`}
                  label="Qty"
                  type="number"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Hapus
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ menu_id: "", quantity: "1" })}
            >
              + Tambah Item
            </Button>
          </div>

          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPendingCreateOrder}>
              {isPendingCreateOrder ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
