# 🛒 React + Flask Product Manager App

ระบบจัดการสินค้าแบบ Fullstack ที่ใช้ React เป็น Frontend และ Flask + MongoDB เป็น Backend

---

## 📦 Features

- เพิ่ม / ลบ / แก้ไขสินค้า
- แสดงรายการสินค้า
- เชื่อมต่อฐานข้อมูล MongoDB Atlas
- ใช้ RESTful API (GET, POST, PUT, DELETE)
- รองรับการจัดการผ่านหน้าเว็บแบบเรียลไทม์

---

## 🖥️ เทคโนโลยีที่ใช้

### Frontend:
- React.js
- Axios
- Tailwind CSS + CSS Custom
- Jest (สำหรับเทส)

### Backend:
- Flask
- PyMongo (เชื่อม MongoDB)
- Flask-CORS
- dotenv (โหลด env config)

---

## 🚀 การติดตั้ง (Installation Guide)

ระบบนี้ประกอบด้วย 2 ส่วนหลัก: **Frontend (React)** และ **Backend (Flask + MongoDB)**  
คุณต้องติดตั้งและรันทั้งสองฝั่งตามขั้นตอนด้านล่าง:

---

### 1️⃣ Clone โปรเจกต์

```bash
git clone <your-repo-url>
cd product-app
```

---

### 2️⃣ ติดตั้งและรัน Backend (Flask API)

📁 เข้าไปในโฟลเดอร์ `backend/`

```bash
cd backend
```

🔧 ติดตั้งไลบรารี Python ที่จำเป็น:

```bash
pip install flask flask-cors pymongo python-dotenv
```

🧪 สร้างไฟล์ `.env` แล้วใส่ค่าการเชื่อม MongoDB:

```env
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>/products?retryWrites=true&w=majority
```

🟢 รัน Flask API:

```bash
python app.py
```

> ✅ API จะรันอยู่ที่: `http://127.0.0.1:5000`

---

### 3️⃣ ติดตั้งและรัน Frontend (React)

📁 กลับไปยังโฟลเดอร์โปรเจกต์หลัก:

```bash
cd ..
```

🔧 ติดตั้ง dependencies ด้วย npm:

```bash
npm install
```

▶️ รัน React frontend:

```bash
npm start
```

> 🌐 หน้าเว็บจะแสดงที่: `http://localhost:3000`

---

### 🧪 ทดสอบเบื้องต้น (Optional)

สามารถรัน unit test ของ React ได้โดยใช้คำสั่ง:

```bash
npm test
```

---

### 📂 โครงสร้างโปรเจกต์โดยรวม

```
product-app/
├── backend/               # Flask API + MongoDB connection
│   ├── app.py             # Main Flask app
│   └── .env               # MongoDB connection string
├── src/                   # React frontend
│   ├── product.js         # Main product UI component
│   ├── index.js           # Entry point for React app
│   ├── product.css        # Custom styling
│   └── ...
├── package.json           # React dependencies
└── README.md              # Project documentation
```
