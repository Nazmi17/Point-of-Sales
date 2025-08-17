export type CustomerFormState = {
  status?: string;
  errors?: {
    id?: string[];
    name?: string[];
    telp?: string[];
    address?: string[];
    image_url?: string[];
    _form?: string[];
  };
};
