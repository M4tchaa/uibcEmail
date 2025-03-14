import './App.css'
import EmailStatus from "./components/EmailStatus";
import EmailForm from "./components/EmailForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6 p-6">
      <EmailForm />
      <EmailStatus />
    </div>
  );
}

export default App
