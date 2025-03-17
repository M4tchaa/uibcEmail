import { useState } from "react";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    judul: "",
    waktu: "",
    lokasi: "",
    link: "",
    poster: null as File | null, // Upload file
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Fungsi untuk mengonversi waktu ke format Indonesia (DD/MM/YYYY HH:mm)
  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Menangani perubahan input
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Menangani perubahan file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, poster: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const formattedDate = formatDateTime(formData.waktu); // Konversi waktu ke format Indonesia

    const formDataToSend = new FormData();
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("judul", formData.judul);
    formDataToSend.append("waktu", formattedDate); // Kirim dalam format DD/MM/YYYY HH:mm
    formDataToSend.append("lokasi", formData.lokasi);
    formDataToSend.append("link", formData.link);
    if (formData.poster) {
      formDataToSend.append("poster", formData.poster);
    }

    console.log("Data yang dikirim:", formattedDate); // Debug

    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        body: formDataToSend,
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
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Kirim Email Broadcast</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="message"
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded-md h-24"
          required
        />
        <input
          type="text"
          name="judul"
          placeholder="Judul Acara"
          value={formData.judul}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="datetime-local"
          name="waktu"
          value={formData.waktu}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="lokasi"
          placeholder="Lokasi Acara"
          value={formData.lokasi}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="link"
          placeholder="Link Acara"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim Email"}
        </button>
      </form>
      {responseMessage && (
        <p className="mt-3 text-center text-sm font-semibold">{responseMessage}</p>
      )}
    </div>
  );
};

export default EmailForm;
