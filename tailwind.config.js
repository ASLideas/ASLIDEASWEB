/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        verdeTecnologico: '#1B4D3E',
        verdeEsperanza: '#2D6A4F',
        doradoElegante: '#B08D4B',
        doradoClaro: '#D4AF37',
        fondoCrema: '#FAF8F5',
      },
    },
  },
  plugins: [],
};
