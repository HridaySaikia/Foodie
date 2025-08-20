import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            console.log("🔐 Attempting login with:", credentials.email);
            
            const res = await fetch("http://localhost:5000/api/loginUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // FIXED: Use credentials object instead of undefined variables
                body: JSON.stringify({ 
                    email: credentials.email, 
                    password: credentials.password 
                })
            });

            const data = await res.json();
            console.log("🔐 Login response:", data);
            
            if (data.success) {
                // Store both tokens
                localStorage.setItem("authToken", data.authToken);
                localStorage.setItem("userEmail", credentials.email);
                
                console.log("✅ Login successful, tokens stored");
                navigate("/");
            } else {
                alert("Invalid credentials: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            alert("Login failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-indigo-950 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Login
                </h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <small className="text-gray-500 dark:text-gray-400 text-sm mt-1 block">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !credentials.email || !credentials.password}
                    className={`w-full font-semibold py-2 px-4 rounded transition-colors ${
                        loading || !credentials.email || !credentials.password
                            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                >
                    {loading ? 'Signing in...' : 'Submit'}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-700 dark:text-gray-300">
                        I'm a new User?{' '}
                        <Link
                            to="/createuser"
                            className="text-purple-600 hover:underline font-semibold"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;