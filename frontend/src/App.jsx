import React from "react";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#3b82f6", secondary: "#1e293b" },
          },
        }}
      />

      <Dashboard />
    </div>
  );
};

export default App;
