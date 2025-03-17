import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataEmail from "./components/DataEmail";
import BroadcastEmail from "./components/EmailForm";
import EmailStatus from "./components/EmailStatus";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Parent Route Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Halaman default Dashboard (tampilan awal sebelum pilih menu) */}
          <Route index element={<h1 className="text-2xl font-semibold">Selamat Datang di Dashboard</h1>} />

          {/* Sub-routes untuk konten dalam dashboard */}
          <Route path="data-email" element={<DataEmail />} />
          <Route path="broadcast-email" element={<BroadcastEmail />} />
          <Route path="email-status" element={<EmailStatus />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
