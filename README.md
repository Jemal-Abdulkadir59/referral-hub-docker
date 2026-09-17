# Referral Hub – Dockerized Multi-Service Application

Referral Hub is a healthcare referral management application designed to help health centers manage patient referrals to a general hospital.

This version of the project uses **MongoDB and Mongoose** as the database layer and is maintained in the `mongodb-version` branch.

The project demonstrates full-stack development, Docker containerization, multi-service communication, environment management, JWT authentication, and deployment-oriented application structure.

## 🚀 Overview

The application consists of three main services:

* **Frontend:** Next.js
* **Backend:** Node.js / Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT
* **Containerization:** Docker & Docker Compose

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │      Next.js        │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │   Node.js / Express │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB       │
                    │      Database       │
                    └─────────────────────┘
```

Docker Compose is used to run the frontend, backend, and MongoDB as separate services.

## ✨ Features

### 🔐 Authentication & Authorization

The application uses **JWT-based authentication** and role-based access control.

Supported roles include:

* Admin
* Data Clerk
* Nurse
* Doctor

Each role has access to functionality based on its responsibilities within the referral workflow.

### 👤 Patient Management

Healthcare staff can manage patient information, including:

* Patient registration
* Personal information
* Medical history
* Patient records

### 🏥 Referral Management

The system supports creating and managing patient referrals between healthcare facilities.

Referral information includes:

* Referral reason
* Referral description
* Patient information
* Referring health center
* Referral status
* Assigned healthcare staff

### 👨‍⚕️ Doctor Reports

Doctors can submit reports for referred patients, including:

* Diagnosis
* Medications at discharge
* Follow-up instructions
* Prognosis
* Doctor report

## 🛠️ Technologies

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Next.js        | Frontend application           |
| Node.js        | Backend runtime                |
| Express.js     | REST API                       |
| MongoDB        | NoSQL database                 |
| Mongoose       | MongoDB ODM                    |
| JWT            | Authentication & authorization |
| Docker         | Containerization               |
| Docker Compose | Multi-service orchestration    |
| Git & GitHub   | Version control                |

## 🐳 Docker & Docker Compose

The application is containerized into multiple services:

```text
┌───────────────────────────────────────┐
│           Docker Compose              │
│                                       │
│  ┌─────────────┐                      │
│  │  Frontend   │                      │
│  │   Next.js   │                      │
│  └──────┬──────┘                      │
│         │                              │
│         ▼                              │
│  ┌─────────────┐                      │
│  │   Backend   │                      │
│  │ Node/Express│                      │
│  └──────┬──────┘                      │
│         │                              │
│         ▼                              │
│  ┌─────────────┐                      │
│  │   MongoDB   │                      │
│  └─────────────┘                      │
│                                       │
└───────────────────────────────────────┘
```

Docker Compose allows the services to communicate using the Docker network and provides a consistent development environment.

## ⚙️ Environment Variables

The application uses environment variables for configuration.

Example backend configuration:

```env
PORT=8000
MONGO_URI=mongodb://mongodb:27017/referral-hub
JWT_SECRET=your_jwt_secret
```

Example frontend configuration:

```env
NEXT_PUBLIC_CLIENT_API_URL=http://localhost:8000/api/v1
```

> Do not commit `.env` files or sensitive credentials to GitHub.

## ▶️ Running the Application

### 1. Clone the repository

```bash
git clone https://github.com/Jemal-Abdulkadir59/referral-hub-docker.git

cd referral-hub-docker
```

### 2. Switch to the MongoDB version

```bash
git checkout mongodb-version
```

### 3. Start the services

```bash
docker compose up --build
```

Or run in detached mode:

```bash
docker compose up -d --build
```

### 4. Stop the services

```bash
docker compose down
```

To remove the MongoDB volume and its stored data:

```bash
docker compose down -v
```

> **Warning:** `docker compose down -v` removes the database volume and deletes the stored MongoDB data.

## 📁 Project Structure

```text
referral-hub-docker/
│
├── referral-hub-backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── Dockerfile
│   └── package.json
│
├── referral-hub-frontend/
│   ├── app/
│   ├── components/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 🔄 Multi-Service Communication

The services communicate through the Docker Compose network.

```text
Frontend
   │
   │ HTTP API requests
   ▼
Backend
   │
   │ Mongoose
   ▼
MongoDB
```

The backend connects to MongoDB using the MongoDB service name defined in Docker Compose rather than relying on `localhost` between containers.

## 📚 What I Learned

This project provided practical experience with:

* Building a full-stack healthcare application
* Developing REST APIs with Node.js and Express.js
* Using MongoDB for application data
* Designing MongoDB schemas with Mongoose
* Implementing JWT authentication
* Implementing role-based authorization
* Containerizing applications with Docker
* Running multiple services with Docker Compose
* Configuring container-to-container communication
* Managing environment variables
* Structuring an application for deployment
* Working with Git branches and GitHub

## 🌿 Branch Information

This branch contains the **MongoDB/Mongoose implementation** of Referral Hub.

```text
main
 │
 └── mongodb-version
       │
       ├── MongoDB
       ├── Mongoose
       ├── Next.js
       ├── Node.js / Express
       └── Docker Compose
```

The `mongodb-version` branch is preserved as the MongoDB-based implementation of the project.

## 🔗 Repository

GitHub repository:

https://github.com/Jemal-Abdulkadir59/referral-hub-docker

## 👨‍💻 Author

**Jemal Abdulkadir**

Computer Science | Cloud & DevOps | Full-Stack Development

GitHub:
https://github.com/Jemal-Abdulkadir59
