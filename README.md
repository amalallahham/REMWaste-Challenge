# Skip Booking UI

This is a skip selection interface built using **React**, **Ant Design**, **Redux**, and **Redux Toolkit (RTK)**. The application allows users to choose skip sizes, filter options, and switch between two user interface (UI) experiences.

---

## 🧰 Tech Stack

- React
- Ant Design (antd)
- Redux
- Redux Toolkit (RTK)

---

## 🚀 How to Run

1. **Install dependencies**  
   Run the following command in your terminal:

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`.

---

## 🎛 Switching UI Modes

At the top of the page, you'll see a **"Change UI"** button.

- **Default UI (UI mode)**: Focuses on **choosing skip sizes** visually.
- **Alternate UI (UX mode)**: Focuses on **filtering and searching** skip types based on user criteria like price, size, and permissions.

---

## 🎯 Purpose

This project uses **Redux Toolkit** to demonstrate understanding of:

- Global state management
- Reducers and slices
- Connecting UI components to Redux state

---

## 📁 Project Structure

```
src/
│
├── assets/               # Fonts and static assets
│   └── fonts/
│
├── components/           # Main page components
│   ├── filter.jsx        #reusable filter Component
│   ├── filterDrawer.jsx  #sidebar component
│   ├── skipps.jsx        #first UI with the filter
│   ├── skipSelectionStep.jsx     #second UI
│   └── stepper.jsx         #recreating Stepper
│
├── hooks/                # Custom hooks (e.g. debounce)
│
├── styles/               # Global/custom styles
│   └── App.css
│
├── store/                # Redux logic
│   ├── reducers/
│   │   ├── filterSlice.js
│   │   └── themeSlice.js
│   ├── services/
│   │   └── skipsApi.js
│   └── store.js
│
├── App.jsx               # App entry component
├── index.css             # Root CSS
├── main.jsx              # Entry point for Vite
```

---

