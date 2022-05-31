module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary: 'var(--primary)',
      'primary-dark': 'var(--primary-dark)',
      'primary-light': 'var(--primary-light)',
      'gray-600': 'var(--gray-600)',
      'gray-800': 'var(--gray-800)',
      white: 'var(--white)',
      transparent: 'var(--transparent)',
      red: 'var(--red)',
    },
    fontSize: {
      head: ['64px', '96px'],
      subhead: ['36px', '96px'],
      'article-heading': ['30px', '45px'],
      'article-text': ['20px', '30px'],
      'article-info': ['16px', '24px'],
    },
    fontFamily: {
      raleway: 'Raleway',
    },

    extend: { boxShadow: { 'button-hover': '0px 0px 0px 4px "#BBF7D0"' } },
  },
  plugins: [],
};
