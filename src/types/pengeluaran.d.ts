export type PengeluaranFormState = {
  status?: string;
  errors?: {
    id?: string[];
    jumlah_pengeluaran?: string[];
    catatan?: string[];
    _form?: string[];
  };
};
