import { useState } from "react";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    judul: "",
    waktu: "",
    lokasi: "",
    link: "",
    poster: "", // now a string (URL)
    gender: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
  
    const formattedDate = formatDateTime(formData.waktu);
  
    const payload = {
      ...formData,
      waktu: formattedDate,
    };
  
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (result.success) {
        setResponseMessage("✅ Email berhasil dikirim!");
      } else {
        setResponseMessage("❌ Gagal mengirim email: " + result.message);
      }
    } catch (error: any) {
      setResponseMessage("⚠️ Error: " + error.message);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-6 text-gray-700">📤 Form Kirim Email Broadcast</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section: Receiver */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🧑‍🤝‍🧑 Penerima Email</h3>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
            required
          >
            <option value="">Pilih Gender</option>
            <option value="MALE">Laki-laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="peserta">Peserta</option>
            <option value="panitia">Panitia</option>
            <option value="trial">Trial</option>
            <option value="key">Key</option>
          </select>
        </div>

        {/* Section: Email Content */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📩 Isi Email</h3>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
            required
          />

          <textarea
            name="message"
            placeholder="Pesan"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-24 mb-2"
            required
          />

          <input
            type="text"
            name="judul"
            placeholder="Judul Acara"
            value={formData.judul}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="datetime-local"
            name="waktu"
            value={formData.waktu}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="text"
            name="lokasi"
            placeholder="Lokasi Acara"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="text"
            name="link"
            placeholder="Link Acara"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <input
            type="text"
            name="poster"
            placeholder="Link Poster (URL)"
            value={formData.poster}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 mt-4"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim Email"}
        </button>
      </form>

      {/* Feedback */}
      {responseMessage && (
        <p className="mt-4 text-center text-sm font-semibold">{responseMessage}</p>
      )}
    </div>
  );
};

export default EmailForm;
