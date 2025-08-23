import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // ADD THIS LINE:
  const API_BASE_URL = "https://foodie-backend-tau.vercel.app";

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          setIsVerified(true);
        } else {
          localStorage.removeItem("adminToken");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("adminToken");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isVerified ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
