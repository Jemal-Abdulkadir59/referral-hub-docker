import axios from 'axios'

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
  baseURL: isServer
    ? (`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1` || 'http://backend:8000/api/v1')
    : (`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/api/v1` || 'http://localhost:8000/api/v1'), 
  withCredentials: true, // Send cookies across origins
})
console.log("BASE URL:", axiosInstance.defaults.baseURL)
export default axiosInstance




// // src/lib/axios.js
// import axios from 'axios'

// const axiosInstance = axios.create({
//   //  baseURL: 'http://127.0.0.1:8000/api/v1', // Change to your backend URL
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,

//   withCredentials: true, // send cookies
//    timeout: 5000 // 👈 ADD THIS
// })

// export default axiosInstance
