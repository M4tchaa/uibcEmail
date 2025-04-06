import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import readXlsxFile from "read-excel-file";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const categories = ["peserta", "panitia", "trial", "key"];

const DataEmail = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "", phone: "", gender: "", category: "" });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // 🔄 Ambil data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/data-email`);
      const result = await response.json();

      if (result.success) {
        setData(result.data); // ✅ Ambil `data` dari result
      } else {
        toast.error("Gagal memuat data email");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Gagal mengambil data");
      setIsLoading(false);
    }
  };


  // 🗑️ Hapus Data dengan Konfirmasi
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      const response = await fetch(`${API_URL}/data-email/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Data berhasil dihapus");
        fetchData();
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  // ✏️ Edit Data (Buka Modal)
  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setIsEditing(true);
    setModalOpen(true);
  };

  // ➕ Tambah Data (Buka Modal)
  const handleAddUser = () => {
    setCurrentUser({ id: "", name: "", email: "", phone: "", gender: "", category: categories[0] });
    setIsEditing(false);
    setModalOpen(true);
  };

  // ✅ Simpan Data (Tambah/Edit)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/data-email/${currentUser.id}` : `${API_URL}/data-email`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });

      if (response.ok) {
        toast.success(`Data berhasil ${isEditing ? "diedit" : "ditambahkan"}`);
        fetchData();
        setModalOpen(false);
      } else {
        toast.error(`Gagal ${isEditing ? "mengedit" : "menambah"} data`);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  // 📂 Import dari XLSX
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    readXlsxFile(file).then((rows) => {
      const formattedData = rows.slice(1).map((row) => ({
        name: row[0],
        email: row[1],
        phone: row[2],
        gender: row[3],
        category: row[4],
      }));

      fetch(`${API_URL}/data-email/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Import berhasil!");
          fetchData();
        })
        .catch(() => toast.error("Import gagal"));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Data Email</h1>

      {/* 📂 Upload XLSX */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4 border p-2" />

      {/* ➕ Tombol Tambah Data */}
      <button onClick={handleAddUser} className="bg-blue-700 text-white px-4 py-2 rounded-md mb-4 ml-2">
        Tambah Data
      </button>

      {/* 📋 Data Table */}
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">No HP</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: any) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.gender}</td>
                <td className="border p-2">{user.category}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 📝 Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Data" : "Tambah Data"}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <input type="text" placeholder="Nama" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} className="border p-2 w-full rounded-md" required />
                <input type="email" placeholder="Email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} className="border p-2 w-full rounded-md" required />
                <input type="text" placeholder="No HP" value={currentUser.phone} onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} className="border p-2 w-full rounded-md" required />

                {/* Gender */}
                <div className="flex items-center space-x-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="MALE" checked={currentUser.gender === "MALE"} onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })} />
                    Laki-laki
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="FEMALE" checked={currentUser.gender === "FEMALE"} onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })} />
                    Perempuan
                  </label>
                </div>

                {/* Kategori */}
                <select value={currentUser.category} onChange={(e) => setCurrentUser({ ...currentUser, category: e.target.value })} className="border p-2 w-full rounded-md">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <div className="flex justify-end gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Simpan</button>
                  <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Batal</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DataEmail;
