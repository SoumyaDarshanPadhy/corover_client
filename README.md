# COROVER Client

A modern React-based frontend application for COROVER, built with Vite, featuring real-time chat, dashboard analytics, and database query functionality.

## Features

- **Authentication**: Secure login and session management
- **Dashboard**: Analytics and data visualization with charts and metrics
- **Chat Interface**: Real-time messaging and communication
- **Raw Queries**: Execute and manage database queries directly
- **Sessions Management**: Track and manage user sessions
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Data Visualization**: Charts and graphs using Recharts

## Tech Stack

- **React 19**: Modern React with latest features
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Recharts**: Composable charting library
- **Lucide React**: Beautiful icon library
- **ESLint**: Code quality and consistency

## Project Structure

```
src/
├── api/  
│   ├── axios.js   
│   └── dashboard.api.js   
├── assets/  
├── components/
│   ├── common/  
│   │   └── SideBar.jsx
│   └── layout/  
│       └── Layout.jsx
├── pages/       
│   ├── Chat.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── RawQueries.jsx
│   └── Sessions.jsx
├── routes/       
│   └── AppRoutes.jsx
├── utils/
│   └── auth.js    
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```
   VITE_API_URL=http://localhost:<server_port>/api
   ```

### Development

Start the development server:

```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- **`bun run dev`** - Start development server with hot module replacement
- **`bun run build`** - Build for production
- **`bun run preview`** - Preview production build locally
- **`bun run lint`** - Run ESLint to check code quality

## Usage

### Authentication

Users must log in through the Login page. Authentication tokens are stored in local storage and included in API requests via the Axios interceptor.

### Dashboard

View analytics and key metrics with interactive charts and data visualization.

### Chat

Access the real-time chat interface for communication and messaging.

### Queries

To view the queries of the users

### Sessions

Manage and view active user sessions with detailed information.

## API Integration

The client communicates with the backend API through Axios. Configuration is handled in `src/api/axios.js`:

- Base URL is set via environment variables
- Authentication tokens are automatically included in requests
- Error handling is centralized for consistent error responses

## Build & Deployment

Build the application for production:

```bash
bun run build
```

The optimized build will be created in the `dist/` folder, ready for deployment.

## Development Guidelines

- Keep components small and reusable
- Use Tailwind CSS for styling
- Follow the established folder structure
