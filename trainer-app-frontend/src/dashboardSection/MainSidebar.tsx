import React from "react";

const MainSidebar: React.FC = () => {
  return (
    <aside className="w-16 flex flex-col items-center bg-black text-white py-4">
      {/* Example: Logo/Icon at the top */}
      <div className="mb-6">
        {/* Placeholder for a logo */}
        <div className="w-8 h-8 bg-gray-500 rounded-full" />
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col space-y-6 mt-4">
        <button className="flex flex-col items-center">
          {/* Placeholder icon */}
          <div className="w-6 h-6 bg-gray-500 rounded" />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-500 rounded" />
          <span className="text-xs mt-1">Analytics</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-500 rounded" />
          <span className="text-xs mt-1">Finances</span>
        </button>
      </nav>

      {/* Expand with more icons as needed */}
    </aside>
  );
};

export default MainSidebar;
