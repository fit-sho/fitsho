"use client";
import React, { useState } from "react";

const SubSidebar: React.FC = () => {
  const [showEditDetails, setShowEditDetails] = useState(false);

  const toggleEditDetails = () => {
    setShowEditDetails((prev) => !prev);
  };

  return (
    <aside className="w-64 flex flex-col bg-white border-r border-gray-200">
      {/* Top / title */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Edit Details - with dropdown */}
        <div>
          <button
            onClick={toggleEditDetails}
            className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 justify-between"
          >
            <span>Edit Details</span>
            <span>{showEditDetails ? "▲" : "▼"}</span>
          </button>
          {showEditDetails && (
            <div className="mt-2 ml-4 space-y-2">
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                Change Password
              </button>
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                Change Email
              </button>
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                Deactivate Account
              </button>
            </div>
          )}
        </div>

        {/* Another section */}
        <button className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
          Profile Settings
        </button>
        <button className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
          Preferences
        </button>
      </nav>

      {/* Bottom user info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="text-gray-700 font-medium">Your Name</div>
        </div>
      </div>
    </aside>
  );
};

export default SubSidebar;
