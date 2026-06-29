# Referral Hub!

Referral Hub is a full-stack referral management system connecting health centers and a general hospital. It enables efficient patient referral, tracking, and reporting — ensuring better collaboration across healthcare facilities.

🚀 Tech Stack
## 🖥 Backend
Node.js, Express.js, MongoDB, Mongoose, JWT Authentication (Bearer token in headers)

## 🌐 Frontend

Next.js (JavaScript), axios with Bearer Token Auth, Responsive UI for doctors, nurses, admins, and data clerks

## 💡 What it Does

Health centers refer patients to a general hospital. The hospital team (doctors, nurses, data clerks) manages, tracks, and treats the referrals.

## 🔄 Referral Workflow
Health Centers: 

  Register patients
  Send referral forms to the general hospital

General Hospital: 

  View and manage incoming referrals
  
  Doctors treat referred patients and submit treatment reports
  
  Referral statuses updated (Pending → Accepted)

  | Role           | Description                                            |
| -------------- | -------------------------------------------------------- |
| **Admin**      | Full access to manage users, roles, and settings         |
| **Doctor**     | Views referrals, treats patients, writes reports         |
| **Nurse**      | Prepares data for doctors, updates referral info         |
| **Data Clerk** | manages referral submissions                             |
| **User**       | Health center staff: registers patients, sends referrals |

📦 Getting Started
  ## 🛠 Backend Setup
      Getting Started
        https://github.com/Jemal-Abdulkadir59/referral-hub-backend.git
      
        npm install
        npm start
        
## 💻 Frontend Setup
  npm install
  
  npm run start

## Auth Flow
On login, a JWT token is issued by the backend.

Token is stored in local storage or cookie (depending on your strategy).

All protected routes make API requests using: Authorization: Bearer <token>



This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

````
