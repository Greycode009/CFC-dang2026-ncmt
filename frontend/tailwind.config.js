export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f9d83",
        "primary-dark": "#0f896f",
        "primary-soft": "#d9f3ec",
        secondary: "#16404c",
        surface: "#ffffff",
        bg: "#f4faf9",
        text: "#0f172a",
        muted: "#64748b",
        border: "#e2e8f0",
        success: "#10b981",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        lg: "1.75rem",
        sm: "0.75rem",
      },
    },
  },
};
