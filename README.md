Absolutely Tsehaynesh! Let’s map out **the full step-by-step frontend plan for Dopantry Pal** based on your **backend**. I’ll include **all pages, components, attributes, API integration, and functionality** so you can build an MVP that works end-to-end.

---

# Dopantry Pal Frontend Step-by-Step Plan

## 1️⃣ Folder Structure

```
dopantry-pal-frontend/
├─ public/
│   └─ index.html
├─ src/
│   ├─ api/                 
│   │   └─ api.js           # Axios instance
│   ├─ assets/                    
│   │   ├─ images/          # icons, logos
│   │   └─ logos/
│   ├─ components/                
│   │   ├─ Navbar/
│   │   │   ├─ Navbar.jsx
│   │   │   └─ Navbar.css
│   │   ├─ ItemCard/
│   │   │   ├─ ItemCard.jsx
│   │   │   └─ ItemCard.css
│   │   ├─ AlertCard/
│   │   │   ├─ AlertCard.jsx
│   │   │   └─ AlertCard.css
│   │   ├─ ProtectedRoute/
│   │   │   ├─ ProtectedRoute.jsx
│   │   │   └─ ProtectedRoute.css
│   │   └─ Loader.jsx
│   ├─ context/                  
│   │   └─ AuthContext.jsx
│   ├─ pages/                    
│   │   ├─ Login/
│   │   │   ├─ Login.jsx
│   │   │   └─ Login.css
│   │   ├─ Register/
│   │   │   ├─ Register.jsx
│   │   │   └─ Register.css
│   │   ├─ Dashboard/
│   │   │   ├─ Dashboard.jsx
│   │   │   └─ Dashboard.css
│   │   ├─ Pantry/
│   │   │   ├─ Pantry.jsx
│   │   │   └─ Pantry.css
│   │   ├─ Alerts/
│   │   │   ├─ Alerts.jsx
│   │   │   └─ Alerts.css
│   │   └─ Profile/
│   │       ├─ Profile.jsx
│   │       └─ Profile.css
│   ├─ utils/                    
│   │   └─ helpers.js            # date formatting, validation
│   ├─ App.jsx
│   ├─ App.css
│   ├─ main.jsx
│   └─ index.css
├─ package.json
└─ vite.config.js
```

---

## 2️⃣ Axios API Setup (`src/api/api.js`)

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Add JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

---

## 3️⃣ Auth Context (`src/context/AuthContext.jsx`)

* Holds `user` and `token`
* Handles `login`, `logout`, `register`
* Exposes to all components

```js
import { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const register = async (name, email, password) => {
    const res = await API.post("/auth/register", { name, email, password });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 4️⃣ Pages & Attributes

### **Login Page**

* Inputs: `email`, `password`
* Button: `Login`
* Redirect: `/dashboard` after login

### **Register Page**

* Inputs: `name`, `email`, `password`
* Button: `Register`
* Redirect: `/dashboard` after register

### **Dashboard Page**

* Show summary: total items, expiring soon, alerts count
* Links to `Pantry`, `Alerts`, `Profile`

### **Pantry Page**

* Display all items (`ItemCard`)
* Each item attributes:

```
userId
name
category
quantity
unit
location
purchaseDate
expiryDate
notes
imageUrl
barcode
```

* Buttons: `Edit`, `Delete`, `Add New Item`
* Expiry highlight: red if expiring soon

### **Alerts Page**

* Display all alerts (`AlertCard`)
* Attributes: `item name`, `expiryDate`, `seen`
* Action: mark as seen (`PUT /alerts/:id/seen`)

### **Profile Page**

* Display user info (`name`, `email`, `avatarUrl`)
* Edit profile optional

---

## 5️⃣ Components

* **Navbar** → navigation links: Dashboard, Pantry, Alerts, Profile, Logout
* **ItemCard** → shows item info, edit/delete buttons
* **AlertCard** → shows alerts info
* **ProtectedRoute** → redirects to `/login` if not logged in
* **Loader** → optional loading spinner

---

## 6️⃣ Step-by-Step Implementation

### Step 1: Setup Vite + React + Axios

```bash
npm create vite dopantry-pal-frontend
npm install react-router-dom axios validator dayjs
```

### Step 2: Create Folder Structure

Follow the **folders above**, separate CSS per page/component

### Step 3: Setup `api.js` and `AuthContext.jsx`

### Step 4: Create Public Pages

* Login / Register (standalone first, then connect AuthContext)

### Step 5: Setup Routing

* Use **React Router v6** in `App.jsx`
* Wrap App in `<BrowserRouter>` in `main.jsx`

### Step 6: Build Components

* Navbar, ItemCard, AlertCard, ProtectedRoute

### Step 7: Connect Pantry & Alerts Pages

* Use **API calls** to fetch/create/update/delete items & alerts

### Step 8: Add Profile Page

* Display user info, optional edit

### Step 9: Styling

* Add **CSS for each component/page**
* Use responsive design

### Step 10: Test Frontend

* Check all routes, CRUD operations, alerts, auth flow

---

If you want, I can **write a full ready-to-run `Login`, `Register`, `Dashboard`, `Pantry`, `Alerts`, `Profile` pages with Axios integration** so you just copy them into your frontend folder and connect to your backend immediately.

Do you want me to do that next?
