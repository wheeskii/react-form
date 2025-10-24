import axios from 'axios';

    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api/', // Replace with your API base URL
      headers: {
        'Content-Type': 'application/json',
        // Add any other default headers like Authorization tokens here
      },
    //   timeout: 10000, // Optional: Request timeout in milliseconds
    });

    export default axiosInstance;