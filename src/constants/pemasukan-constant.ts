export const HEADER_TABLE_PEMASUKAN = [
  "No",
  "Jumlah Pemasukan",
  "Catatan",
  "Tanggal",
  "Action",
];

export const INITIAL_PEMASUKAN = {
  jumlah_pemasukan: "",
  catatan: "",
};

export const INITIAL_STATE_PEMASUKAN = {
  status: "idle",
  errors: {
    id: [],
    jumlah_pemasukan: [],
    catatan: [],
    _form: [],
  },
};
