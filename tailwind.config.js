import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#1d6b57',
          'primary-content': '#ffffff',
          secondary: '#f2b134',
          'secondary-content': '#2b1d00',
          accent: '#e4572e',
          neutral: '#1c2b27',
          'base-100': '#ffffff',
          'base-200': '#f3f6f4',
          'base-300': '#e1e8e4',
          'base-content': '#1c2b27',
        },
      },
      {
        dark: {
          primary: '#3fb597',
          'primary-content': '#04231b',
          secondary: '#f2b134',
          'secondary-content': '#2b1d00',
          accent: '#ff7a4d',
          neutral: '#0f1a17',
          'base-100': '#121c19',
          'base-200': '#0d1513',
          'base-300': '#233630',
          'base-content': '#e4efea',
        },
      },
    ],
  },
};
