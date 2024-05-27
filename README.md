# React + Vite + TailWind

## Community Pets - Project README

### Introduction

This project is a practice ClientSide, Front-End created for a previous front-end capstone project. 

### Project Origin

As a professional pet sitter, I often have clients ask for sits when I am unavailable. I thought it would be cool if I could connect my clients in one spot so that when I am not available for sits, they could trade sits with each other.

### Planning

An Entity-Relationship Diagram (ERD) of base information was designed to include the users, who can create a profile, add their pets, or edit either entity within the UI while keeping their information only visible to the user who is logged in at the time. The structure of the post includes relevant information but does not share the user's information, allowing responses on the site in a comment, response, and like ability.

### ERD
[Link to ERD](https://dbdiagram.io/d/My-page-API-64ff5c7302bd1c4a5e5d5bb6)

### Getting Started

#### Start React Project With Vite

If you just want to set up a blank React project, follow these steps:

1. Make a new directory in workspace for the application.
2. In that new directory, create a React app template:
npm create vite@latest . -- --template react

3. Open in VS Code.
4. Run `npm run dev` to start the development server.

#### To Use Tailwind

To use Tailwind, follow these steps:

1. Install dependencies:

npm install -D tailwindcss postcss autoprefixer

2. Initialize Tailwind configuration:


3. Replace the contents of `tailwind.config.js` with the provided configuration.
4. Replace the contents of `index.css` with the provided CSS.

####  Acknowledgements

This project includes an animated sleeping cat design and animation inspired by a CodePen created by agoodwin.  The animation can be found on the "Add Pet" UI. While modifications and updates have been made to fit the specific needs of this project, the foundational animation and design concepts are credited to agoodwin's original work. Additionally, the animation was converted from CodePen to a modular format suitable for Visual Studio.

You can view the original CodePen here:  http://codepen.io/agoodwin/pen/ypeWYE
