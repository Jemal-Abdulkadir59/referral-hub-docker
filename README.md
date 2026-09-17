# Referral Hub – Dockerized Multi-Service Application

Referral Hub is a healthcare referral management application designed to coordinate patient referrals between health centers and a general hospital.

The project demonstrates **full-stack development, containerization, multi-service communication, environment management, and deployment-oriented architecture** using modern web technologies.

## 🚀 Overview

The application consists of:

* **Frontend:** Next.js
* **Backend:** Node.js / Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT
* **Containerization:** Docker & Docker Compose

The system supports different healthcare roles and provides a structured workflow for managing patients, referrals, and doctor reports.

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
                               │ Prisma
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
```

With Docker Compose, the frontend, backend, and database can run as separate services within the same application environment.

## ✨ Key Features

### Role-Based Access Control

The application uses JWT authentication and role-based authorization for different healthcare users, including:

* Admin
* Data Clerk
* Nurse
* Doctor

Each role has access to functionality appropriate to its responsibilities.

### Patient Management

Healthcare staff can manage patient information and medical history as part of the referral workflow.

### Referral Management

The system allows healthcare centers to create and manage patient referrals, including:

* Referral reason
* Referral description
* Patient information
* Referral status
* Assignment to healthcare staff

### Doctor Reports

Doctors can provide reports containing information such as:

* Diagnosis
* Medications at discharge
* Follow-up instructions
* Prognosis
* Doctor report

## 🛠️ Technologies

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| Next.js        | Frontend application             |
| Node.js        | Backend runtime                  |
| Express.js     | REST API                         |
| PostgreSQL     | Relational database              |
| Prisma         | Database ORM                     |
| JWT            | Authentication and authorization |
| Docker         | Application containerization     |
| Docker Compose | Multi-container orchestration    |
| Git & GitHub   | Version control                  |

## 🐳 Dockerization

The application is containerized into multiple services to provide a consistent development and deployment environment.

Docker Compose is used to coordinate the services:

```text
Frontend
   │
   ├── Docker Container
   │
Backend
   │
   ├── Docker Container
   │
PostgreSQL
   │
   └── Docker Container
```

This approach helps avoid environment differences between development environments and provides a foundation for deploying the individual services independently.

## 🔄 Database Migration

The project was initially developed using **MongoDB with Mongoose**.

The database layer was later migrated to:

```text
MongoDB + Mongoose
        ↓
PostgreSQL + Prisma
```

The migration provided experience with relational database design, schema management, migrations, and Prisma-based database access.

## ⚙️ Environment Configuration

The application uses environment variables to configure service-specific settings.

Examples include:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLIENT_API_URL=your_backend_api_url
PORT=8000
```

Sensitive credentials should be stored in environment-specific configuration and should not be committed to Git.

## ▶️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Jemal-Abdulkadir59/referral-hub-docker.git

cd referral-hub-docker
```

### 2. Configure environment variables

Create the required environment files for the frontend and backend.

Example:

```env
DATABASE_URL=postgresql://username:password@postgres:5432/referral_hub
JWT_SECRET=your_secret
```

### 3. Start the application

```bash
docker compose up --build
```

To run the services in the background:

```bash
docker compose up -d --build
```

### 4. Stop the application

```bash
docker compose down
```

To also remove the database volume:

```bash
docker compose down -v
```

> **Warning:** Removing volumes deletes the persisted PostgreSQL data associated with the Compose volume.

## 📁 Project Structure

```text
referral-hub-docker/
│
├── referral-hub-backend/
│   ├── src/
│   ├── prisma/
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

## ☁️ Deployment-Oriented Architecture

The project was designed with cloud deployment in mind.

The containerized services can be built into Docker images and deployed independently using container platforms.

Example deployment flow:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Docker Build
    │
    ▼
Container Registry
    │
    ▼
Container Platform
    │
    ├── Frontend Service
    │
    └── Backend Service
             │
             ▼
        PostgreSQL
```

This architecture provides practical experience with concepts used in modern **Cloud and DevOps workflows**, including containerization, service separation, environment configuration, and deployment preparation.

## 📚 What I Learned

Through this project, I gained practical experience with:

* Building a multi-service full-stack application
* Dockerizing frontend and backend applications
* Using Docker Compose for local multi-container environments
* Configuring communication between containers
* Managing environment variables
* Implementing JWT authentication
* Implementing role-based access control
* Designing REST APIs
* Migrating from MongoDB to PostgreSQL
* Using Prisma for database access and migrations
* Structuring applications for cloud deployment
* Working with Git and GitHub

## 🔗 Repository

GitHub:

https://github.com/Jemal-Abdulkadir59/referral-hub-docker

## 👨‍💻 Author

**Jemal Abdulkadir**

Computer Science | Cloud & DevOps | Full-Stack Development

GitHub:
https://github.com/Jemal-Abdulkadir59
