/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B5ED7",
          dark: "#123A8F",
          light: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          dark: "#172033",
        },
        neutral: {
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-headline": ["3rem", { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }],
        "heading-1": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-2": ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-3": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-4": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "6rem",
        "section-sm": "4rem",
        "container-x": "1.5rem",
      },
      borderRadius: {
        "card": "0.875rem",
        "btn": "0.625rem",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(23, 32, 51, 0.04), 0 1px 2px rgba(23, 32, 51, 0.02)",
        "card-hover": "0 4px 12px rgba(23, 32, 51, 0.08), 0 2px 4px rgba(23, 32, 51, 0.04)",
        "nav": "0 1px 0 rgba(23, 32, 51, 0.05)",
      },
      screens: {
        "xs": "480px",
      },
      maxWidth: {
        "content": "72rem",
        "prose": "42rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "hero-float": "heroFloat 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-0.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
