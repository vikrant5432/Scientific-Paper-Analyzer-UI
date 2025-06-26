import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./components/authentication/Authentication";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./components/dashboard/DashboardPage";
import RequireAuth from "./guard/RequireAuth";
import PaperPage from "./components/paper/PaperPage";
import LibraryPage from "./components/library/libraryPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/papers/:paperId" element={<PaperPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
