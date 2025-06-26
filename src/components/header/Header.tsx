import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({
  onMenuClick,
}: Readonly<{ onMenuClick: () => void }>) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    localStorage.removeItem("token"); // Example
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between backdrop-blur-sm px-6 py-4 shadow-sm border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-purple-600 transition-colors corsor-pointer"
        >
          Paper QA Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate("/library")}
          className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
        >
          Library
        </button>
        <div className="relative group">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border-white">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
