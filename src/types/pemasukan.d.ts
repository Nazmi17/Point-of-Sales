export type PemasukanFormState = {
  status?: string;
  errors?: {
    id?: string[];
    jumlah_pemasukan?: string[];
    catatan?: string[];
    _form?: string[];
  };
};
