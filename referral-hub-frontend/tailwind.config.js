const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // for App Router
    './pages/**/*.{js,ts,jsx,tsx}', // if using Pages Router
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './@core/**/*.{js,ts,jsx,tsx}' // if using @core folders
  ],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [
    require('tailwindcss-logical'),
    require('./@core/tailwind/plugin') // updated if not under src anymore
  ],
  theme: {
    extend: {}
  }
}

export default config
