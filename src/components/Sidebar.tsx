import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiMail, FiSend, FiLogOut } from "react-icons/fi"; // Import ikon dari react-icons

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      alert("Logout berhasil!");
      navigate("/");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} flex flex-col`}>
        {/* Tombol Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="p-4 text-xl text-white">
          <FiMenu />
        </button>

        {/* Menu */}
        <nav className="flex flex-col space-y-4 mt-4 px-2">
          <Link to="/data-email" className="flex items-center p-3 hover:bg-blue-700 rounded">
            <FiMail className="text-xl" />
            {isOpen && <span className="ml-3">Data Email</span>}
          </Link>
          <Link to="/broadcast-email" className="flex items-center p-3 hover:bg-blue-700 rounded">
            <FiSend className="text-xl" />
            {isOpen && <span className="ml-3">Broadcast Email</span>}
          </Link>
          <button onClick={handleLogout} className="flex items-center p-3 hover:bg-red-600 rounded">
            <FiLogOut className="text-xl" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Spacer untuk mendorong konten utama */}
      <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}></div>
    </div>
  );
}

export default Sidebar;
