export const HEADER_TABLE_PENGELUARAN = [
  "No",
  "Jumlah Pengeluaran",
  "Catatan",
  "Tanggal",
  "Action",
];

export const INITIAL_PENGELUARAN = {
  jumlah_pengeluaran: "",
  catatan: "",
};

export const INITIAL_STATE_PENGELUARAN = {
  status: "idle",
  errors: {
    id: [],
    jumlah_pengeluaran: [],
    catatan: [],
    _form: [],
  },
};
