export type OrderFormState = {
  formStatus?: string;
  errors?: {
    customer_id?: string[];
    catatan?: string[];
    status?: string[];
    _form?: string[];
  };
};
