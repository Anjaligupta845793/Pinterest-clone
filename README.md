# Pinterest Clone

## Project Overview
This is a feature-rich Pinterest Clone application, designed and built with modern web technologies. The project mimics the functionality of Pinterest, allowing users to create, update, and delete their pins, as well as interact with other users by adding and deleting comments. User authentication is implemented to ensure a personalized and secure experience.

## Project 
 https://pinterest-clone1-b57o.onrender.com/
## Features

### Core Functionality
- **User Authentication**: Login and logout functionality for secure user access.
- **Pin Management**: Users can:
  - Create new pins.
  - Update existing pins.
  - Delete their own pins.
- **Comments**: Users can:
  - Add comments to pins.
  - Delete their own comments.
- **Browse Pins**: View all pins shared by users.

### Tech Stack
#### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: Framework for building the RESTful API.
- **MongoDB**: Database for storing user, pin, and comment data.
- **Cloudinary**: Cloud-based service for image upload and management.

#### Frontend
- **React**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern UI design.

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/)

### Steps

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Anjaligupta845793/Pinterest-clone
   cd pinterest-clone/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

#### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Usage
1. Open the frontend application in your browser at `http://localhost:5000`.
2. Register or log in to start creating, managing, and interacting with pins.

## Project Structure

```
project-directory/
├── backend/
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── controllers/   # Business logic for routes
│   ├── middleware/    # Authentication and validation
│   └── server.js      # Entry point for the backend
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Global state management
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point for React
└── README.md           # Project documentation
```



## License
This project is licensed under the MIT License.

---
Feel free to contribute to the project or report any issues by creating a pull request or an issue on the [GitHub repository](https://github.com/your-repo/pinterest-clone).

## Acknowledgments
- Thanks to [Cloudinary](https://cloudinary.com/) for the image management services.
- Inspired by the original [Pinterest](https://www.pinterest.com/).

