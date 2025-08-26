import FormImage from "@/common/form-image";
import FormInput from "@/common/form-input";
import FormSelect from "@/common/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormCustomer<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} Pelanggan</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "Add a new menu" : "Make changes menu here"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4 max-h-[50vh] px-1 overflow-y-auto">
            <FormInput
              form={form}
              name={"name" as Path<T>}
              label="Name"
              placeholder="Masukkan nama pelanggan"
            />
            <FormInput
              form={form}
              name={"telp" as Path<T>}
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon pelanggan"
              type="number"
            />
            <FormInput
              form={form}
              name={"address" as Path<T>}
              label="Alamat"
              placeholder="Masukkan alamat pelanggan"
            />
            <FormImage
              form={form}
              name={"image_url" as Path<T>}
              label="Gambar"
              preview={preview}
              setPreview={setPreview}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
