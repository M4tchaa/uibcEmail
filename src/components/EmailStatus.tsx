import { useState, useEffect } from "react";

const EmailStatus = () => {
  const [batchNumber, setBatchNumber] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/email-status");
        const data = await response.json();
        setBatchNumber(data.currentBatch);
        setTotalBatches(data.totalBatches);
        setEmailsSent(data.emailsSent);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh setiap 30 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold text-gray-700">Status Pengiriman Email</h2>
      <p className="text-gray-600">Batch Saat Ini: <strong>{batchNumber}</strong></p>
      <p className="text-gray-600">Total Batch: <strong>{totalBatches}</strong></p>
      <p className="text-gray-600">Total Email Terkirim: <strong>{emailsSent}</strong></p>
    </div>
  );
};

export default EmailStatus;
