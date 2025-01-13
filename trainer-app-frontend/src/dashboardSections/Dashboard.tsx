import React from "react";
import MainSidebar from "./MainSidebar";
import SubSidebar from "./SubSidebar";
import Header from "./Header";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Leftmost (black) sidebar */}
      <MainSidebar />

      {/* Second sidebar */}
      <SubSidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-700">
              {/* This is where your content (e.g., profile info, dashboards, etc.) goes */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              hendrerit dolor, at consectetur augue.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
