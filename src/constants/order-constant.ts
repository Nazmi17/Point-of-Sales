import { OrderFormState } from "@/types/order";

export const HEADER_TABLE_ORDER = [
  "No",
  "Order ID",
  "Nama Pelanggan",
  "Total Harga",
  "Catatan",
  "Status",
  "Action",
];

export const INITIAL_ORDER = {
  customer_id: "",
  catatan: "",
  status: "",
};


export const INITIAL_STATE_ORDER: OrderFormState = {
  formStatus: "idle",
  errors: {
    customer_id: [],
    catatan: [],
    status: [],
    _form: [],
  },
};

export const STATUS_CREATE_ORDER = [
  {
    value: "lunas",
    label: "Lunas",
  },
  {
    value: "proses",
    label: "Proses",
  },
  {
    value: "batal",
    label: "Batal",
  }
];

export const HEADER_TABLE_DETAIL_ORDER = [
  "No",
  "Nama barang",
  "Harga per-satuan",
  "Subtotal",
];
