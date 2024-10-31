// axiosInterceptor.js
import axios from "axios";

export const setupAxiosInterceptors = (setAuth, setUserRole) => {
  axios.defaults.withCredentials = true; // Include credentials for all requests

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Exclude login requests from the refresh-token logic
      if (originalRequest.url === "http://localhost:5000/api/customer/login") {
        return Promise.reject(error); // Let login errors be handled by the login function directly
      }

      // Check for 401 error (unauthorized) and that the request has not already been retried
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Avoid infinite retry loops

        try {
          // Attempt token refresh
          const { data } = await axios.post(
            "http://localhost:5000/api/customer/refresh-token",
            {},
            { withCredentials: true }
          );
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`; // Set new access token
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`; // Update the request header
          return axios(originalRequest); // Retry original request
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          setAuth(false);
          setUserRole(null);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // For all other errors, reject as usual
      return Promise.reject(error);
    }
  );
};
