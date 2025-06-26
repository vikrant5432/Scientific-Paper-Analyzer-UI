import { Home, FileText, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({
  open,
  onClose,
}: Readonly<{ open: boolean; onClose: () => void }>) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-opacity-20 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-full z-50 
          bg-purple-200 backdrop-blur-sm border-r border-gray-200
          transition-all duration-300 ease-in-out
          group
          ${open ? "translate-x-0 w-64" : "-translate-x-full w-16"} 
          lg:translate-x-0 lg:w-16 lg:hover:w-64
          overflow-hidden
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="font-medium text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 lg:mt-8 space-y-2 px-3">
          <button
            onClick={() => {
              navigate("/dashboard");
              onClose();
            }}
            className={`
              flex items-center w-full px-3 py-3 rounded-lg
              transition-all duration-200 group/item
              ${
                isActive("/dashboard")
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }
            `}
          >
            <Home size={20} className="flex-shrink-0" />
            <span className="ml-4 font-medium lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transform lg:translate-x-4 transition-all duration-200 whitespace-nowrap overflow-hidden">
              Dashboard
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/library");
              onClose();
            }}
            className={`
              flex items-center w-full px-3 py-3 rounded-lg
              transition-all duration-200 group/item
              ${
                isActive("/library")
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }
            `}
          >
            <FileText size={20} className="flex-shrink-0" />
            <span className="ml-4 font-medium lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transform lg:translate-x-4 transition-all duration-200 whitespace-nowrap overflow-hidden">
              Library
            </span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3 flex content-center">
          <div className="flex items-center justify-center lg:group-hover:justify-start transition-all duration-200">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">PQ</span>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600 opacity-0 lg:group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              Paper QA
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
