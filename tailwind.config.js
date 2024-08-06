module.exports = {
  mode: 'jit', // Enable JIT mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'aclonica': ['Aclonica', 'sans-serif'],
    },
    extend: {
      colors: {
        customBlue: '#084C73',
        customBlue2: '#1167B1',
        customBlue3: '#207DBF',
        customGrey: '#484848',
        customSky1: '#DDE5FF',
        customSky2: '#F7F8FE',
        customSky3: '#EEF7FF',
        btnColor: '#1e1b4b'
      },
    },
  },
  plugins: [],
}
