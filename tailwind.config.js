module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: "#eef2ff",
            100: "#e6eeff",
            500: "#6b46c1"
          }
        }
      }
    },
    plugins: []
  };
  