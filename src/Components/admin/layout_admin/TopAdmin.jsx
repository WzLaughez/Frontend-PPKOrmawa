import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Topbar({ toggleSidebar }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white dark:bg-gray-900">
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
          RP
        </div>
      </div>
    </div>
  );
}
