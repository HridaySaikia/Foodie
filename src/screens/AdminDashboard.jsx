import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");
    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [foodForm, setFoodForm] = useState({
        name: "",
        category: "",
        img: "",
        description: "",
        options: { "": 0 },
        _id: null,
    });

    const [searchQuery, setSearchQuery] = useState(""); // Search state

    const token = localStorage.getItem("adminToken");

    // Fetch Foods
    const fetchFoods = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/food`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFoods(data);
    };

    // Fetch Orders
    const fetchOrders = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/orders`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
    };

    // Fetch Users
    const fetchUsers = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
    };

    // Handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "foods") fetchFoods();
        if (tab === "orders") fetchOrders();
        if (tab === "users") fetchUsers();
        setShowForm(false); // hide form when switching tabs
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    // Open form for adding/editing
    const openForm = (food = null) => {
        if (food) {
            setFoodForm({ ...food, options: food.options || { "": 0 } });
        } else {
            setFoodForm({
                name: "",
                category: "",
                img: "",
                description: "",
                options: { "": 0 },
                _id: null,
            });
        }
        setShowForm(true);
    };

    // Submit form
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { _id, name, category, img, description, options } = foodForm;

        if (_id) {
            await fetch(`${process.env.BASE_URL}/api/admin/food/${_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name, category, img, description, options }),
            });
        } else {
            await fetch(`${process.env.BASE_URL}/api/admin/food`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name, category, img, description, options }),
            });
        }

        fetchFoods();
        setShowForm(false);
    };

    // Delete food
    const handleDelete = async (_id) => {
        if (window.confirm("Are you sure you want to delete this food item?")) {
            await fetch(`${process.env.BASE_URL}/api/admin/food/${_id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFoods();
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700 p-6 shadow-xl">
                <h2 className="text-2xl font-extrabold mb-8 tracking-wide text-blue-400">
                    ⚡ Admin Panel
                </h2>
                <ul className="space-y-4">
                    <li
                        onClick={() => handleTabClick("foods")}
                        className="cursor-pointer hover:text-blue-400 hover:translate-x-1 transition duration-200"
                    >
                        🍔 Manage Foods
                    </li>
                    <li
                        onClick={() => handleTabClick("orders")}
                        className="cursor-pointer hover:text-green-400 hover:translate-x-1 transition duration-200"
                    >
                        📦 Orders
                    </li>
                    <li
                        onClick={() => handleTabClick("users")}
                        className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 transition duration-200"
                    >
                        👥 Users
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-10 w-full bg-red-600 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-lg shadow-red-500/30"
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                <div className="backdrop-blur-xl bg-gray-800/60 border border-gray-700 rounded-2xl shadow-xl p-8">
                    {activeTab === "home" && (
                        <>
                            <h1 className="text-3xl font-bold mb-4 text-blue-400">
                                Welcome, Admin 👋
                            </h1>
                            <p className="text-gray-300">
                                Choose a section from the sidebar to manage your platform.
                            </p>
                        </>
                    )}

                    {/* Foods */}
                    {activeTab === "foods" && (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold mb-4 text-blue-400">
                                    🍔 Manage Foods
                                </h2>
                                <button
                                    onClick={() => openForm()}
                                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    + Add Food
                                </button>
                            </div>

                            {/* Search Bar */}
                            <input
                                type="text"
                                placeholder="Search food by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
                            />

                            {showForm && (
                                <form
                                    onSubmit={handleFormSubmit}
                                    className="mb-6 p-4 bg-gray-700 rounded-lg shadow"
                                >
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={foodForm.name}
                                        onChange={(e) =>
                                            setFoodForm({ ...foodForm, name: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                                        required
                                    />

                                    {/* Category selection */}
                                    <div className="mb-2">
                                        <label className="block text-gray-300 mb-1">Category</label>
                                        <select
                                            value={foodForm.category}
                                            onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                                            className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                                        >
                                            <option value="">Select existing category</option>
                                            {foods
                                                .map(f => f.category)
                                                .filter((v, i, a) => a.indexOf(v) === i)
                                                .map((cat, idx) => (
                                                    <option key={idx} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Or add new category"
                                            value={foodForm.category}
                                            onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                                            className="w-full p-2 rounded bg-gray-800 text-white"
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={foodForm.img}
                                        onChange={(e) =>
                                            setFoodForm({ ...foodForm, img: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={foodForm.description}
                                        onChange={(e) =>
                                            setFoodForm({ ...foodForm, description: e.target.value })
                                        }
                                        className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                                    />

                                    {/* Dynamic Options */}
                                    {Object.entries(foodForm.options).map(([key, value], index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Size (e.g. Half)"
                                                value={key}
                                                onChange={(e) => {
                                                    const newOptions = { ...foodForm.options };
                                                    const val = newOptions[key];
                                                    delete newOptions[key];
                                                    newOptions[e.target.value] = val || 0;
                                                    setFoodForm({ ...foodForm, options: newOptions });
                                                }}
                                                className="w-1/2 p-2 rounded bg-gray-800 text-white"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={value}
                                                onChange={(e) => {
                                                    const newOptions = { ...foodForm.options };
                                                    newOptions[key] = Number(e.target.value);
                                                    setFoodForm({ ...foodForm, options: newOptions });
                                                }}
                                                className="w-1/2 p-2 rounded bg-gray-800 text-white"
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFoodForm({
                                                ...foodForm,
                                                options: { ...foodForm.options, "": 0 },
                                            })
                                        }
                                        className="mb-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        + Add Option
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                                    >
                                        {foodForm._id ? "Update Food" : "Add Food"}
                                    </button>
                                </form>
                            )}

                            <ul className="space-y-2">
                                {foods
                                    .filter((food) =>
                                        food.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((food) => (
                                        <li
                                            key={food._id}
                                            className="p-3 bg-gray-700 rounded-lg shadow hover:bg-gray-600 flex justify-between items-center"
                                        >
                                            <div>
                                                {food.name} -{" "}
                                                {food.options
                                                    ? Object.entries(food.options)
                                                        .map(([size, price]) => `${size}: ₹${price}`)
                                                        .join(", ")
                                                    : ""}{" "}
                                                ({food.category})
                                            </div>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => openForm(food)}
                                                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    )}

                    {/* Orders */}
                    {activeTab === "orders" && (
                        <>
                        <input
                            type="text"
                            placeholder="Search name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
                        />
                            <h2 className="text-2xl font-bold mb-4 text-green-400">📦 Orders</h2>
                            <ul className="space-y-2">
                                {orders
                                    .filter((order) =>
                                        order.email.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((order) => (
                                        <li
                                            key={order._id}
                                            className="p-3 bg-gray-700 rounded-lg shadow hover:bg-gray-600"
                                        >
                                            {order.email} - {order.order_data.length} items
                                        </li>
                                    ))}
                            </ul>
                        </>
                    )}

                    {/* Users */}
                    {activeTab === "users" && (
                        <>
                        <input
                            type="text"
                            placeholder="Search name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
                        />
                            <h2 className="text-2xl font-bold mb-4 text-yellow-400">👥 Users</h2>
                            <ul className="space-y-2">
                                {users.filter((user) =>
                                        user.email.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).map((user) => (
                                    <li
                                        key={user._id}
                                        className="p-3 bg-gray-700 rounded-lg shadow hover:bg-gray-600"
                                    >
                                        {user.name} ({user.email})
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
