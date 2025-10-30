
## 1️⃣ Folder Structure

```
dopantry-pal-frontend/
├─ public/
│   └─ index.html
├─ src/
│   ├─ api/                 
│   │   └─ api.js          
│   ├─ assets/                    

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
│   │
│   ├─ App.jsx
│   ├─ App.css
│   ├─ main.jsx
│   └─ index.css
├─ package.json
└─ vite.config.js
🥕 PantryPal Frontend – Smart Kitchen Assistant
PantryPal frontend is a React.js application that provides a user-friendly interface to manage your kitchen inventory, track expiry dates, and organize food items efficiently.

📌 Features


Food Inventory Dashboard – View all items in your pantry, fridge, and freezer.


Add/Edit/Delete Items – Quickly manage your food items.


Expiry Notifications – Visual indicators for items nearing expiry.


Responsive Design – Works seamlessly on desktop and mobile.


Interactive UI – Smooth navigation with React Router.



🛠️ Technology Stack


Framework: React.js


Routing: React Router


API Calls: Axios


Styling: External CSS, Responsive Design


Deployment: Vercel



⚡ Getting Started – Run Locally
1️⃣ Clone the Repository
git clone https://github.com/tsi1221/Panterypal.git
cd Panterypal/frontend


2️⃣ Install Dependencies
npm install


3️⃣ Configure API URL


Open src/api.js (or wherever API calls are defined).


Replace the backend URL with your local or deployed backend endpoint. Example:


export const API_URL = "http://localhost:5000"; // or [Render backend URL](https://panterypalsideback.onrender.com)


4️⃣ Start the Frontend
npm start



The app will run on http://localhost:5173 by default.


Make sure your backend server is running and CORS is configured for http://localhost:5173.



5️⃣ Using the Application


Open http://localhost:5173 in your browser.


Register or log in with your account.


Add, edit, or remove items in your pantry, fridge, or freezer.


Track expiry dates and stay organized.



🌐 Deployment


Frontend Live Demo: https://pantrypal-e.vercel.app/


CORS is configured to allow this origin on the backend.

Fork the repository.



✅ The PantryPal frontend is designed to make kitchen management simple and intuitive. I’m proud of this work — it’s clean, responsive, and practical!
