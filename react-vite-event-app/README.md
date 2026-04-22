# React Vite Event Management App

This project is a responsive Event Management App built with **React** and **Vite**. It allows users to register, log in, access a dashboard, and manage events in a clean Bootstrap interface. The app uses **React Context API** to manage shared user and event data across components.

## Features

- User registration with:
  - Name
  - Email address
  - Password
- Input validation for forms
- Email format validation
- User login and protected dashboard access
- Add new events with:
  - Event name
  - Date
  - Time
  - Location
  - Description
- Dynamic event rendering using **React array.map()**
- Event list view and calendar-style grouped view
- Edit and delete event functionality
- State updates that keep the UI in sync with the stored data
- Fixed top navigation header with links to:
  - Dashboard
  - Add Event
  - Help
- Help page that explains how the app works
- Responsive layout for desktop, tablet, and mobile devices
- Bootstrap used for styling and layout
- Git-friendly project structure and documentation

## Technologies Used

- React
- Vite
- React Router DOM
- React Context API
- Bootstrap
- LocalStorage (for demo persistence)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the app

After running the command above, open the local address shown in the terminal.

## Demo Login

You can use the demo account below:

- **Email:** demo@example.com
- **Password:** Password123

## Project Structure

```text
src/
  components/
  context/
  pages/
  utils/
  App.jsx
  main.jsx
  styles.css
```

## Notes

- User and event data are stored in localStorage for demonstration purposes.
- This makes the app easy to test without setting up a backend.
- Git should be used to track progress and version history during development.

## Suggested Git Commands

```bash
git init
git add .
git commit -m "Initial commit - event management app"
```

