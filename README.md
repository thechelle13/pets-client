# React + Vite + TailWind

React client to interact with Pet API.

Start React Project With Vite
If you just want to set up a blank React project, but not use Tailwind, follow these steps.

Make a new directory in workspace for the application.
In that new directory, create a React app template
npm create vite@latest . -- --template react
Open in VS Code
npm run dev to start the development server
Optionally Use Tailwind
If you want to use Tailwind, follow these additional steps, otherwise skip them. If you already started the dev server, you can stop it, or just open a new terminal and run these commands.

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Replace the contents of tailwind.config.js with the following.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Replace the contents of index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
