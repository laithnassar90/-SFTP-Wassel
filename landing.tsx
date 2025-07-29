import React from "react";

export default function MobileLanding() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-yellow-400 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <img src="/wassel-logo.svg" alt="Wassel" className="w-28 mb-6" />
        <h1 className="text-3xl font-extrabold text-white mb-2">Connect. Ride. Arrive.</h1>
        <p className="text-lg text-blue-100 mb-6">The trusted ridesharing marketplace for the Middle East</p>
        <a href="/register" className="inline-block bg-yellow-400 text-blue-900 font-bold rounded-full px-8 py-3 shadow-lg hover:bg-yellow-300 transition">
          Get Started
        </a>
      </div>
      <div className="bg-white rounded-t-3xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Why Wassel?</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-900 text-yellow-400 p-2 rounded-full">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <span>Verified Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-900 text-yellow-400 p-2 rounded-full">
              <i className="fa-solid fa-female"></i>
            </span>
            <span>Women-Only Rides</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-900 text-yellow-400 p-2 rounded-full">
              <i className="fa-solid fa-tree"></i>
            </span>
            <span>Offset CO₂</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-900 text-yellow-400 p-2 rounded-full">
              <i className="fa-solid fa-star"></i>
            </span>
            <span>Loyalty & Badges</span>
          </div>
        </div>
        <div className="text-center mt-6">
          <img src="/app-preview.png" alt="App Preview" className="rounded-xl mx-auto shadow-lg w-2/3" />
        </div>
        <div className="mt-8 text-center text-sm text-blue-900 opacity-70">
          <p>© {new Date().getFullYear()} Wassel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}