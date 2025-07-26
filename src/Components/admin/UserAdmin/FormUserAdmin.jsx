import React, { useState } from "react";
import { NavLink } from "react-router";

const FormUserAdmin = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    nik: initialData.nik || "",
    nama: initialData.nama || "",
    tempat_lahir: initialData.tempat_lahir || "",
    tanggal_lahir: initialData.tanggal_lahir || "",
    jenis_kelamin: initialData.jenis_kelamin || "",
    agama: initialData.agama || "",
    no_hp: initialData.no_hp || "",
    rt: initialData.rt || "",
    rw: initialData.rw || "",
    email: initialData.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // bisa dipakai untuk tambah atau update
  };

  return (
    <>
    <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-screen-lg mx-auto text-sm"
>
  <Input label="NIK" name="nik" value={formData.nik} onChange={handleChange} />
  <Input label="Nama" name="nama" value={formData.nama} onChange={handleChange} />
  <Input label="Tempat Lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} />
  <Input label="Tanggal Lahir" name="tanggal_lahir" type="date" value={formData.tanggal_lahir} onChange={handleChange} />
  <Select
    label="Jenis Kelamin"
    name="jenis_kelamin"
    value={formData.jenis_kelamin}
    onChange={handleChange}
    options={[
      { label: "Laki-laki", value: "Laki-laki" },
      { label: "Perempuan", value: "Perempuan" },
    ]}
  />
  <Input label="Agama" name="agama" value={formData.agama} onChange={handleChange} />
  <Input label="No HP" name="no_hp" value={formData.no_hp} onChange={handleChange} />
  <Input label="RT" name="rt" value={formData.rt} onChange={handleChange} />
  <Input label="RW" name="rw" value={formData.rw} onChange={handleChange} />
  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />

  <div className="col-span-full text-right">
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Simpan
    </button>
  </div>
</form>
    </>
  );
};

// Reusable Input component
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

// Reusable Select component
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
    >
      <option value="">Pilih {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormUserAdmin;
