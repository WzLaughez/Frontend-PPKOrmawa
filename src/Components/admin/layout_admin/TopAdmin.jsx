import { Menu, Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { DarkModeContext } from "../../../DarkModeContext";

export default function Topbar({ toggleSidebar }) {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-300">
          RP
        </div>
      </div>
    </div>
  );
}
