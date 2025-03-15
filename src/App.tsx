import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EmailForm from "./components/EmailForm";
import EmailStatus from "./components/EmailStatus";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama yang melebar ketika sidebar ditutup */}
        <div className="transition-all duration-300 flex-1 min-h-screen bg-gray-100 p-6">
          <Routes>
            <Route path="/broadcast-email" element={<><EmailForm /><EmailStatus /></>} />
            <Route path="/data-email" element={<div>Data Email Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
