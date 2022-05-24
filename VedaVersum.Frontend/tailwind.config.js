module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary: "#16a34a",
      "primary-dark": "#166534",
      "primary-hover": "#BBF7D0",
      "gray-600": "#52525b",
      "gray-800": "#27272a",
      white: "#ffffff",
      transparent: "rgba(0,0,0,0)",
    },
    fontSize: {
      head: ["64px", "96px"],
      subhead: ["36px", "96px"],
      "article-heading": ["30px", "45px"],
      "article-text": ["20px", "30px"],
      "article-info": ["16px", "24px"],
    },
    fontFamily: {
      raleway: "Raleway",
    },

    extend: { boxShadow: { "button-hover": '0px 0px 0px 4px "#BBF7D0"' } },
  },
  plugins: [],
};
