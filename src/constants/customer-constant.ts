export const HEADER_TABLE_CUSTOMER = [
  "No",
  "Nama",
  "Nomor Telepon",
  "Alamat",
  "Action",
];

export const INITIAL_CUSTOMER = {
  name: "",
  telp: "",
  address: "",
  image_url: "",
};

export const INITIAL_STATE_CUSTOMER = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    telp: [],
    address: [],
    image_url: [],
    _form: [],
  },
};
