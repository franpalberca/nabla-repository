# nabla wind hub - test App

Nabla Wind Hub - test App is a CRUD application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to sign up, log in, view their data, update their information (including a profile picture), and delete their account.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#teck-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Nabla Wind Hub - test App is a comprehensive solution for managing user accounts. The backend is built with Node.js and Express, ensuring robust and scalable server-side operations. MongoDB is used as the database to store user data. The frontend is built with React, providing a responsive and interactive user experience.

## Features

- User Registration: Users can sign up with an email and password.
- User Login: Users can log in to view their data.
- User Profile: Users can view their profile information.
- Update Profile: Users can update their name, email, and profile picture.
- Delete Account: Users can delete their account.

## Tech Stack

- Backend: Node.js, Express, MongoDB, Prisma, Multer (for file uploads), Cloudinary (for saving files), body-parser, nodemon and others.
- Frontend: React, React Router Dom, Style-components, React-jwt, Bootstrap, etc.
- Testing: Jest, Jest-mock-extended and ts-jest

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. **Clone the repository**:

   ```bash
      git clone https://github.com/franpalberca/nabla-repository

   ```

2. **Navigate to the backend directory:**

   ```bash
   cd nabla-repository/server

   ```

3. **Install the dependencies:**

   ```bash
   npm install

   ```

4. **Create a .env file and add your MongoDB URI and other environment variables:**
   ```bash
   MONGO_CLUSTER_URI=
   APP_ORIGIN=
   PORT=
   NODE_ENV=development
   JWT_SECRET=
   CLOUDINARY_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

## Frontend Setup

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd nabla-repository/client

   ```
2. **Install the dependencies:**
   ```bash
   npm install

   ```
3. **Create a .env file and add your JWT and other environment variables:**
   ```bash
   VITE_API_URL=
   VITE_API_URL_USER=
   JWT_SECRET=

## Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
2. **Start the frontend server in a separate terminal:**
   ```bash
   cd client
   npm run dev
   ```
3. **Open your browser and navigate to http://localhost:5173 to see the application.**

## Testing

Tests are implemented using Jest and focus on individual functions and components.

To run tests:

    cd backend
    npm run test

## API Endpoints

### - POST user

- Registers a new user
- Request body: `{userName, userEmail, userPassword}`

### - POST user/login

- Logs in a user.
- Request body: `{userEmail, userPassword}`

### - GET user/all-users

- Retrieves user data.
- Requires authentication and admin authorization.

### - PATCH user/:userId

- Updates user data.
- Requires authentication.
- Request body: `{userName, userEmail}`
- File upload: `userImage`

### - DELETE user/:userId

- Deletes an user account.
- Requires authentication.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is free of license.
