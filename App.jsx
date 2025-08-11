import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col dark-mode" role="application" aria-label="Wassel Carpooling App" tabIndex="0">
      <header className="bg-blue-600 text-white p-4 shadow-lg" role="banner">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="tooltip group">
            <img src="/wassel-logo.png" alt="Wassel Logo" className="logo h-10" onError={(e) => e.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} />
            <span className="tooltiptext">Wassel - Carpooling Made Easy</span>
          </div>
          <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center space-x-4 flex-wrap">
            <span className="text-sm" aria-live="polite" aria-label="Current user: Guest">Welcome, Guest</span>
            <button className="px-4 py-2 bg-white text-blue-600 dark:text-blue-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-all" aria-label="Switch to Driver mode" data-tooltip="Switch role (Alt + S)">
              Switch to Driver
            </button>
            <button className="px-4 py-2 bg-white text-blue-600 dark:text-blue-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-all" aria-label="Toggle dark mode">
              Toggle Theme
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 flex-grow" role="main" aria-live="polite">
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6" role="region" aria-label="Placeholder">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Wassel App</h2>
          <p className="text-gray-600 dark:text-gray-400">This is a placeholder. Add your ride form, list, and impact components here.</p>
        </section>
      </main>
      <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center p-4" role="contentinfo">
        <p className="text-sm">© 2025 Wassel. Carpool with purpose.</p>
      </footer>
    </div>
  );
}

export default App;