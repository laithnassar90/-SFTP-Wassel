<!DOCTYPE html!>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; connect-src 'none'; img-src 'self' data:;">
  <title>Wassel - Carpooling Marketplace</title>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" integrity="sha256-RrW3u+KEH7bEas63N4H2G0Xkgq1q4i1T0+erV0T4zZw=" crossorigin="anonymous">
  <style>
    .animate-pulse { animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .transition-all { transition: all 0.3s ease; }
    .ride-card:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .logo { max-height: 40px; transition: transform 0.3s; }
    .logo:hover { transform: scale(1.1); }
    .tooltip { position: relative; display: inline-block; }
    .tooltip .tooltiptext { visibility: hidden; background-color: #333; color: #fff; text-align: center; padding: 5px; border-radius: 3px; position: absolute; z-index: 1; bottom: 125%; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.3s; }
    .tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }
  </style>
</head>
<body class="bg-gray-100 font-sans">
  <div id="root" class="min-h-screen flex flex-col">
    <div class="flex-grow flex items-center justify-center">
      <div class="animate-pulse text-gray-500 text-xl">Loading Wassel...</div>
    </div>
  </div>

  <!-- CDN Scripts with Defer -->
  <script defer src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js" integrity="sha256-6q+8+JyqW3S/Ed6A3aybN+0H1r9b6fX1o+0+0+0+0+0=" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js" integrity="sha256-8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8+8=" crossorigin="anonymous"></script>
  <script>
    function loadScripts(maxRetries = 3, retryDelay = 2000) {
      let retries = 0;
      function checkAndInit() {
        if (window.React && window.ReactDOM) {
          initApp();
        } else if (retries < maxRetries) {
          retries++;
          console.log(`Retry ${retries}/${maxRetries} for React scripts...`);
          setTimeout(checkAndInit, retryDelay);
        } else {
          document.getElementById('root').innerHTML =
            '<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-red-600 p-4">' +
            '<h2 class="text-2xl font-bold mb-2">Failed to Load Wassel</h2>' +
            '<p class="mb-2">Unable to load React scripts after ' + maxRetries + ' retries.</p>' +
            '<p>Download to C:\\SFTP\\Wassel\\: <a href="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js" class="underline text-blue-600">React</a> and ' +
            '<a href="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js" class="underline text-blue-600">ReactDOM</a></p>' +
            '</div>';
        }
      }
      window.addEventListener('load', checkAndInit);
    }
    loadScripts();
  </script>

  <script type="text/javascript">
    "use strict";

    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    function sanitizeInput(input) {
      const allowedChars = /^[a-zA-Z0-9\s-.,]+$/;
      return allowedChars.test(input) ? input.replace(/[<>]/g, '').trim() : '';
    }

    function logError(error) {
      console.error(`Error at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })}`, error.stack || error.message);
    }

    function initApp() {
      const React = window.React;
      const ReactDOM = window.ReactDOM;
      const { useState, useReducer, useCallback, useMemo, memo } = React;

      const initialState = {
        rides: [
          { id: 1, from: "Paris", to: "Lyon", date: "2025-08-01", time: "10:00", seats: 3, price: 25, driver: "Ali", chatLevel: "Talkative", rating: 4.5 },
          { id: 2, from: "Berlin", to: "Munich", date: "2025-08-02", time: "14:00", seats: 2, price: 30, driver: "Sara", chatLevel: "Quiet", rating: 4.8 }
        ],
        user: { name: "Guest", isDriver: false, csrf: Math.random().toString(36).substr(2) }
      };

      function reducer(state, action) {
        switch (action.type) {
          case "BOOK_RIDE":
            return { ...state, rides: state.rides.map(r => r.id === action.payload && r.seats > 0 ? { ...r, seats: r.seats - 1 } : r) };
          case "POST_RIDE":
            if (action.payload.csrf !== state.user.csrf) return state;
            return {
              ...state,
              rides: [...state.rides, {
                id: state.rides.length + 1,
                from: sanitizeInput(action.payload.from),
                to: sanitizeInput(action.payload.to),
                date: action.payload.date,
                time: action.payload.time,
                seats: Math.max(1, parseInt(action.payload.seats) || 1),
                price: Math.max(1, parseInt(action.payload.price) || 1),
                chatLevel: action.payload.chatLevel,
                driver: state.user.name,
                rating: null
              }]
            };
          case "TOGGLE_ROLE":
            return { ...state, user: { ...state.user, isDriver: !state.user.isDriver } };
          case "SET_USER_NAME":
            return { ...state, user: { ...state.user, name: sanitizeInput(action.payload) } };
          default:
            return state;
        }
      }

      function useForm(initialValues, validate) {
        const [values, setValues] = useState(initialValues);
        const [errors, setErrors] = useState({});
        const handleChange = debounce(e => {
          const { name, value } = e.target;
          const sanitized = name === "from" || name === "to" ? sanitizeInput(value) : value;
          setValues(prev => ({ ...prev, [name]: sanitized }));
          setErrors(prev => ({ ...prev, [name]: null }));
        }, 300);
        const handleSubmit = e => {
          e.preventDefault();
          const newErrors = validate(values);
          if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
          }
          setValues(initialValues);
          setErrors({});
          return values;
        };
        return { values, errors, handleChange, handleSubmit };
      }

      function ErrorBoundary({ children }) {
        const [state, setState] = useState({ hasError: false, error: null, retryCount: 0 });
        const maxRetries = 2;

        if (state.hasError && state.retryCount < maxRetries) {
          setTimeout(() => setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 })), 1000);
          return React.createElement(
            "div",
            { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 text-yellow-600 p-4" },
            React.createElement("h2", { className: "text-2xl font-bold mb-2" }, "Recovering..."),
            React.createElement("p", null, `Retry ${state.retryCount + 1}/${maxRetries}`)
          );
        } else if (state.hasError) {
          return React.createElement(
            "div",
            { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 text-red-600 p-4" },
            React.createElement("h2", { className: "text-2xl font-bold mb-2" }, "Something went wrong"),
            React.createElement("p", { className: "mb-2" }, state.error?.message || "Unknown error"),
            React.createElement("p", null, "Please refresh or check the console.")
          );
        }

        return children;
      }

      function App() {
        const [state, dispatch] = useReducer(reducer, initialState);
        const bookRide = useCallback(rideId => {
          if (window.confirm("Confirm booking this ride? (Alt + B)")) {
            dispatch({ type: "BOOK_RIDE", payload: rideId });
            const ride = state.rides.find(r => r.id === rideId);
            alert(`Ride booked! CO2 saved: ~${200 + ride.seats * 10}kg`);
          }
        }, [state.rides]);
        const postRide = useCallback(ride => {
          if (window.confirm("Confirm posting this ride? (Alt + P)")) {
            dispatch({ type: "POST_RIDE", payload: { ...ride, csrf: state.user.csrf } });
          }
        }, [state.user.csrf]);
        const toggleRole = useCallback(() => dispatch({ type: "TOGGLE_ROLE" }), []);
        const setUserName = useCallback(name => dispatch({ type: "SET_USER_NAME", payload: name }), []);

        return React.createElement(
          ErrorBoundary,
          null,
          React.createElement(
            "div",
            { className: "min-h-screen flex flex-col", role: "application", "aria-label": "Wassel Carpooling App", tabIndex: "0" },
            React.createElement(Header, { user: state.user, toggleRole, setUserName }),
            React.createElement(
              "main",
              { className: "container mx-auto px-4 py-6 flex-grow", role: "main" },
              React.createElement(RideForm, { postRide, isDriver: state.user.isDriver }),
              React.createElement(RideList, { rides: state.rides, bookRide }),
              React.createElement(EnvironmentalImpact, { rides: state.rides })
            ),
            React.createElement(Footer, null)
          )
        );
      }

      const Header = memo(function Header({ user, toggleRole, setUserName }) {
        const [name, setName] = useState(user.name);

        const handleNameChange = debounce(e => setName(sanitizeInput(e.target.value)), 300);
        const handleNameSubmit = e => {
          e.preventDefault();
          if (name.trim()) setUserName(name);
        };

        return React.createElement(
          "header",
          { className: "bg-blue-600 text-white p-4 shadow-md", role: "banner" },
          React.createElement(
            "div",
            { className: "container mx-auto flex justify-between items-center" },
            React.createElement(
              "div",
              { className: "tooltip group" },
              React.createElement("img", { src: "/wassel-logo.png", alt: "Wassel Logo", className: "logo h-10", onError: e => e.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" }),
              React.createElement("span", { className: "tooltiptext" }, "Wassel - Carpooling Made Easy")
            ),
            React.createElement(
              "div",
              { className: "flex items-center space-x-4" },
              React.createElement(
                "form",
                { onSubmit: handleNameSubmit, className: "flex items-center" },
                React.createElement("input", {
                  type: "text",
                  value: name,
                  onChange: handleNameChange,
                  placeholder: "Enter your name",
                  className: "px-2 py-1 rounded text-gray-800 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  "aria-label": "Update user name"
                }),
                React.createElement("button", {
                  type: "submit",
                  className: "px-2 py-1 bg-white text-blue-600 rounded hover:bg-gray-200 transition-all",
                  "aria-label": "Save user name"
                }, "Save")
              ),
              React.createElement(
                "span",
                { className: "text-sm", "aria-label": "Current user: " + user.name },
                "Welcome, " + user.name
              ),
              React.createElement(
                "button",
                {
                  className: "px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition-all",
                  onClick: toggleRole,
                  "aria-label": "Switch to " + (user.isDriver ? "Passenger" : "Driver") + " mode",
                  "data-tooltip": "Switch role (Alt + S)"
                },
                "Switch to " + (user.isDriver ? "Passenger" : "Driver")
              )
            )
          )
        );
      });

      const RideForm = memo(function RideForm({ postRide, isDriver }) {
        const initialValues = { from: "", to: "", date: "", time: "", seats: 1, price: 10, chatLevel: "Talkative" };
        const validate = values => {
          const errors = {};
          if (!isDriver) errors.role = "Only drivers can post rides.";
          if (!values.from || !values.to) errors.cities = "Both From and To are required.";
          else if (sanitizeInput(values.from) === sanitizeInput(values.to)) errors.cities = "From and To cannot be the same.";
          if (!values.date) errors.date = "Date is required.";
          if (!values.time) errors.time = "Time is required.";
          if (values.seats < 1) errors.seats = "At least 1 seat is required.";
          if (values.price < 1) errors.price = "Price must be at least €1.";
          return errors;
        };
        const { values, errors, handleChange, handleSubmit } = useForm(initialValues, validate);

        const handleKeyPress = e => {
          if (e.altKey && e.key === 'p') handleSubmit(e);
        };

        return React.createElement(
          "section",
          { className: "bg-white p-6 rounded-lg shadow-md mb-6", role: "region", "aria-label": "Post a ride form" },
          React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Post a Ride"),
          errors.role && React.createElement("p", { className: "text-red-500 text-sm mb-2" }, errors.role),
          React.createElement(
            "form",
            { onSubmit: handleSubmit, onKeyPress: handleKeyPress, noValidate: true, className: "grid gap-4 md:grid-cols-2" },
            [["from", "Starting city"], ["to", "Destination city"], ["date", "Travel date"], ["time", "Travel time"],
             ["seats", "Number of seats"], ["price", "Price per seat"]].map(([name, label]) =>
              React.createElement(
                "div",
                { key: name, className: "flex flex-col" },
                React.createElement("input", {
                  name, value: values[name], onChange: handleChange,
                  placeholder: label, required: true,
                  className: "px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                  "aria-label": label, type: name === "seats" || name === "price" ? "number" : name,
                  min: name === "seats" || name === "price" ? "1" : undefined
                }),
                errors[name] && React.createElement("p", { className: "text-red-500 text-sm mt-1" }, errors[name])
              )
            ),
            React.createElement(
              "div",
              { className: "flex flex-col md:col-span-2" },
              React.createElement(
                "select",
                {
                  name: "chatLevel", value: values.chatLevel, onChange: handleChange,
                  className: "px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                  "aria-label": "Preferred chat level"
                },
                ["Quiet", "Talkative", "Very Talkative"].map(level =>
                  React.createElement("option", { key: level, value: level }, level)
                )
              )
            ),
            React.createElement(
              "button",
              {
                type: "submit",
                className: "md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all",
                "aria-label": "Post ride (Alt + P)"
              },
              "Post Ride"
            )
          )
        );
      });

      const RideList = memo(function RideList({ rides, bookRide }) {
        const handleKeyPress = e => {
          if (e.altKey && e.key === 'b' && document.activeElement.tagName !== 'INPUT') {
            const firstBookable = rides.find(r => r.seats > 0);
            if (firstBookable) bookRide(firstBookable.id);
          }
        };

        return React.createElement(
          "section",
          { className: "bg-white p-6 rounded-lg shadow-md mb-6", role: "region", "aria-label": "Available rides", "aria-live": "polite", onKeyPress: handleKeyPress, tabIndex: "0" },
          React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Available Rides"),
          rides.length === 0
            ? React.createElement("p", { className: "text-gray-500" }, "No rides available.")
            : rides.map(ride =>
                React.createElement(
                  "div",
                  { key: ride.id, className: "ride-card p-4 border-b last:border-b-0 transition-all" },
                  React.createElement("h3", { className: "text-lg font-medium" }, ride.from + " → " + ride.to),
                  React.createElement("p", { className: "text-sm" }, React.createElement("strong", null, "Date:"), " " + ride.date + " at " + ride.time),
                  React.createElement("p", { className: "text-sm" }, React.createElement("strong", null, "Driver:"), " " + ride.driver + (ride.rating ? ` (${ride.rating}/5)` : " (New)")),
                  React.createElement("p", { className: "text-sm" }, React.createElement("strong", null, "Seats:"), " " + ride.seats),
                  React.createElement("p", { className: "text-sm" }, React.createElement("strong", null, "Price:"), " €" + ride.price),
                  React.createElement("p", { className: "text-sm" }, React.createElement("strong", null, "Chat:"), " " + ride.chatLevel),
                  React.createElement(
                    "button",
                    {
                      onClick: () => bookRide(ride.id),
                      disabled: ride.seats === 0,
                      className: "mt-2 px-4 py-2 rounded text-white " + (ride.seats === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 transition-all"),
                      "aria-label": `Book ride from ${ride.from} to ${ride.to} (Alt + B)`
                    },
                    ride.seats === 0 ? "Fully Booked" : "Book Ride"
                  )
                )
              )
        );
      });

      const EnvironmentalImpact = memo(function EnvironmentalImpact({ rides }) {
        const impact = useMemo(() => {
          const totalRides = rides.length;
          const totalSeats = rides.reduce((acc, r) => acc + r.seats, 0);
          return { totalRides, totalSeats, co2Saved: totalRides * (200 + totalSeats * 10) };
        }, [rides]);

        requestAnimationFrame(() => {
          const el = document.querySelector('.impact');
          if (el) el.style.opacity = 1;
        });

        return React.createElement(
          "section",
          { className: "bg-white p-6 rounded-lg shadow-md mb-6 impact opacity-0 transition-opacity duration-500", role: "region", "aria-label": "Environmental impact", "aria-live": "polite" },
          React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Environmental Impact"),
          React.createElement(
            "ul",
            { className: "list-disc pl-6 mb-4" },
            ["rides", "seats", "CO₂"].map((item, i) =>
              React.createElement("li", { key: i, className: "text-sm" },
                `Completed ${impact.totalRides} ${item === "CO₂" ? "Saved ~" + impact.co2Saved + "kg of " + item : "Shared " + impact.totalSeats + " " + item}`
              )
            )
          ),
          React.createElement("p", { className: "text-sm text-gray-600" }, "Join us to reduce emissions!")
        );
      });

      const Footer = memo(function Footer() {
        return React.createElement(
          "footer",
          { className: "bg-gray-800 text-white text-center p-4", role: "contentinfo" },
          React.createElement("p", { className: "text-sm" }, "© 2025 Wassel. Carpool with purpose.")
        );
      });

      try {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(React.createElement(App));
        console.log("Wassel app rendered successfully at " + new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
      } catch (error) {
        logError(error);
        document.getElementById('root').innerHTML =
          '<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-red-600 p-4">' +
          '<h2 class="text-2xl font-bold mb-2">Failed to Load Wassel</h2>' +
          '<p class="mb-2">Error: ' + error.message + '</p>' +
          '<p>Please check your internet or try a different browser.</p>' +
          '</div>';
      }
    }
  </script>
</body>
</html>