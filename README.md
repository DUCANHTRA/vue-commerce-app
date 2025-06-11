# Vue Commerce App

A modern e-commerce application built with Vue.js 3, featuring a responsive design and seamless shopping experience.

## 🚀 Features

- Modern Vue 3 composition API
- Responsive design using Vuetify and Bootstrap
- State management with Pinia
- Secure payment processing with Stripe integration
- Toast notifications for better user feedback
- Material Design Icons
- Client-side routing with Vue Router

## 🛠️ Tech Stack

- **Frontend Framework:** Vue.js 3
- **UI Components:** 
  - Vuetify 3
  - Bootstrap 5
  - Bootstrap Vue 3
- **State Management:** Pinia
- **Payment Processing:** Stripe
- **Build Tool:** Vite
- **Icons:** Material Design Icons
- **Notifications:** Mosha Vue Toastify

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd vue-commerce-app
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix

## 🔧 Configuration

The project uses Vite as the build tool. Configuration can be found in `vite.config.js`.

## 📁 Project Structure

```
frontend/
├── public/          # Static assets
├── src/            # Source files
│   ├── assets/     # Project assets
│   ├── components/ # Vue components
│   ├── views/      # Page components
│   ├── router/     # Vue Router configuration
│   ├── stores/     # Pinia stores
│   └── App.vue     # Root component
├── index.html      # Entry HTML file
└── package.json    # Project dependencies and scripts
```

## 🔒 Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Vuetify team for the beautiful UI components
- Stripe for secure payment processing 