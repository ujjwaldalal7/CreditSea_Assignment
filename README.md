# 💳 CreditSea - Full Stack Assignment

A full-stack **MERN** application that parses Experian XML credit reports, stores them in MongoDB, and displays user credit details in a clean and modern dashboard.

---

## 🚀 Features

- Upload XML credit report directly from the frontend  
- Automatically parses XML and stores in MongoDB  
- View credit details such as:
  - Name, mobile, credit score  
  - Active & closed accounts  
  - Secured and unsecured amounts  
  - Bank-wise credit accounts table  
- Built using **React, Tailwind CSS, Axios, Express, MongoDB**  
- Toast notifications for upload and error handling

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios, React Hot Toast |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, Multer, XML2JS |
| **Database** | MongoDB Atlas or Local MongoDB |

---

## ⚙️ Setup Instructions

### 🔹 Clone the repository
```bash
git clone https://github.com/ujjwaldalal7/CreditSea_Assignment.git
cd CreditSea_Assignment

cd backend
npm install

Create a .env file inside backend/ and add:

PORT=5000
MONGO_URI="mongodb+srv://<username>:<passcode>@asscreditsea.wiqxkhc.mongodb.net/creditsea"

//username:default_user
//passcode:user1234

Then start the backend:
npm start

🔹 Frontend Setup
cd ../frontend
npm install
npm run dev
