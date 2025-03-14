import { useState } from "react";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    judul: "",
    waktu: "",
    lokasi: "",
    link: "",
    poster: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    console.log("Data yang dikirim:", formData)

    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setResponseMessage("✅ Email berhasil dikirim!");
      } else {
        setResponseMessage("❌ Gagal mengirim email: " + result.message);
      }
    } catch (error:any) {
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
          type="text"
          name="waktu"
          placeholder="Waktu Acara"
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
          type="text"
          name="poster"
          placeholder="URL Poster"
          value={formData.poster}
          onChange={handleChange}
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
