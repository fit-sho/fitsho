import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    </header>
  );
};

export default Header;
