# Freelancers Bot Backend API

A comprehensive backend API for the Freelancers Bot platform, built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication** - JWT-based auth with bcrypt password hashing
- **Project Management** - Create, view, update, and delete projects
- **Bidding System** - Place bids, accept/reject bids, manage bid status
- **Messaging System** - Real-time chat between users
- **User Profiles** - Complete user profile management
- **Search & Filtering** - Advanced search with pagination
- **Security** - Input validation, error handling, CORS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/freelancers-bot
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get public user profile
- `GET /api/users/search/freelancers` - Search freelancers
- `PUT /api/users/avatar` - Update avatar
- `DELETE /api/users/profile` - Deactivate account

### Projects
- `POST /api/projects` - Create new project (Client only)
- `GET /api/projects` - Get all projects with filters
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project (Owner only)
- `DELETE /api/projects/:id` - Delete project (Owner only)
- `GET /api/projects/user/my-projects` - Get user's projects

### Bids
- `POST /api/bids` - Place bid (Freelancer only)
- `GET /api/bids/project/:projectId` - Get project bids (Owner only)
- `GET /api/bids/my-bids` - Get user's bids
- `PUT /api/bids/:id/accept` - Accept bid (Project owner)
- `PUT /api/bids/:id/reject` - Reject bid (Project owner)
- `DELETE /api/bids/:id` - Withdraw bid (Bid owner)

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/conversation/:userId` - Get conversation with user
- `PUT /api/messages/:id/read` - Mark message as read
- `GET /api/messages/unread-count` - Get unread count
- `DELETE /api/messages/:id` - Delete message

## 🔐 Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Example Usage

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "userType": "freelancer"
  }'
```

### Create a project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Build a React Website",
    "description": "Need a modern website built with React",
    "category": "web-development",
    "skills": "React, Node.js, MongoDB",
    "budgetMin": 1000,
    "budgetMax": 3000,
    "deadline": "2024-02-01"
  }'
```

### Place a bid
```bash
curl -X POST http://localhost:5000/api/bids \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "projectId": "project-id-here",
    "amount": 2000,
    "proposal": "I will build this using React and Node.js",
    "timeline": 14
  }'
```

## 🗄️ Database Models

### User
- Authentication fields (name, email, password, userType)
- Profile fields (bio, skills, hourlyRate, location, website)
- Rating and review system
- Account status management

### Project
- Project details (title, description, category, skills)
- Budget range and deadline
- Status tracking (open, in-progress, completed, cancelled)
- View and bid counters

### Bid
- Bid amount and proposal
- Timeline and status
- Relationship to project and freelancer
- Acceptance tracking

### Message
- Sender and receiver
- Content and attachments
- Read status and timestamps
- Soft delete functionality

## 🔧 Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `FRONTEND_URL` - Frontend URL for CORS

## 🚀 Deployment

1. Set environment variables for production
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`
4. Use PM2 or similar for process management

## 📄 License

This project is licensed under the ISC License. 