"use server";

import { uploadFile, deleteFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { CustomerFormState } from "@/types/customer";
import { customerSchema } from "@/validations/customer-validation";

export async function createCustomer(
  prevState: CustomerFormState,
  formData: FormData
) {
  let validatedFields = customerSchema.safeParse({
    name: formData.get("name"),
    telp: parseFloat(formData.get("telp") as string),
    address: formData.get("address"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  if (validatedFields.data.image_url instanceof File) {
    const { errors, data } = await uploadFile(
      "images",
      "customers",
      validatedFields.data.image_url
    );
    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: {
        ...validatedFields.data,
        image_url: data.url,
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("customers").insert({
    name: validatedFields.data.name,
    telp: validatedFields.data.telp ?? null,
    address: validatedFields.data.address ?? null,
    image_url: validatedFields.data.image_url ?? null,
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function updateCustomer(
  prevState: CustomerFormState,
  formData: FormData
) {
  let validatedFields = customerSchema.safeParse({
    name: formData.get("name"),
    telp: parseFloat(formData.get("telp") as string),
    address: formData.get("address"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  if (validatedFields.data.image_url instanceof File) {
    const oldImageUrl = formData.get("old_image_url") as string | null;
    const oldPath = oldImageUrl ? oldImageUrl.split("/images/")[1] : undefined;

    const { errors, data } = await uploadFile(
      "images",
      "customers",
      validatedFields.data.image_url,
      oldPath
    );
    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    validatedFields = {
      ...validatedFields,
      data: {
        ...validatedFields.data,
        image_url: data.url,
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("customers")
    .update({
      name: validatedFields.data.name,
      telp: validatedFields.data.telp ?? null,
      address: validatedFields.data.address ?? null,
      image_url: validatedFields.data.image_url ?? null,
    })
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function deleteCustomer(prevState: CustomerFormState, formData: FormData) {
  const supabase = await createClient();
  const image = formData.get("image_url") as string | null;

  if (image) {
    const { status, errors } = await deleteFile(
      "images",
      image.split("/images/")[1]
    );

    if (status === "error") {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [errors?._form?.[0] ?? "Unknown error"],
        },
      };
    }
  }

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return { status: "success" };
}
