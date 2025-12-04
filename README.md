# Vue Commerce App

A modern, full-stack e-commerce application built with Vue.js 3 and Node.js, featuring a responsive design, secure authentication, and seamless shopping experience.

## 🚀 Features

- **Full-Stack Architecture**: Separate frontend (Vue 3) and server (Express/Node.js).
- **Modern UI**: Responsive design using Vuetify and Bootstrap.
- **State Management**: Pinia for efficient state handling.
- **Authentication**: Secure user authentication with JWT and bcrypt.
- **Database**: MongoDB integration using Mongoose.
- **Notifications**: Toast notifications for user feedback.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Vue.js 3
- **Build Tool:** Vite
- **UI Components:** Vuetify 3, Bootstrap 5, Bootstrap Vue 3
- **State Management:** Pinia
- **Routing:** Vue Router
- **Icons:** Material Design Icons, Bootstrap Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Utilities:** dotenv, cors

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB (Atlas connection)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [your-repository-url]
cd vue-commerce-app
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

Start the backend server:
```bash
node server.js
# OR with nodemon for development
npx nodemon server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
vue-commerce-app/
├── frontend/           # Vue.js Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/
│   │   └── ...
│   └── ...
├── server/             # Node.js/Express Backend
│   ├── config/         # DB Configuration
│   ├── controllers/    # Route Controllers
│   ├── middleware/     # Custom Middleware
│   ├── models/         # Mongoose Models
│   ├── routes/         # API Routes
│   └── ...
└── README.md
```

## 👥 Authors

- Duc Anh Tran

## 🙏 Acknowledgments

- Vue.js team
- Vuetify team
- Stripe
- Educative.io team for amazing e-commerce project guide and implementation insights
