import { useState } from "react"
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    function handleLogin() {
        const response = axios.post('https://backend-paytm.vercel.app/user/login', {

            username: username,
            password: password
        })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                alert(res.data.msg);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-10">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md md:max-w-lg">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-1 text-black">Login to your account</h2>
                <p className="text-center text-gray-500 mb-4 md:mb-6">Enter your credentials below to login</p>

                {/* Username Input */}
                <div className="mb-3 md:mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Input with Eye Icon */}
                <div className="relative mb-4 md:mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaEye
                        onClick={() => setShow(!show)}
                        className="absolute right-4 top-9 md:top-10 transform cursor-pointer text-gray-500 text-xl"
                    />
                </div>

                {/* Login Button */}
                <button onClick={handleLogin} className="w-full bg-black text-white py-2 md:py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300">
                    Login
                </button>

                {/* Link to Signup Page */}
                <p className="text-center mt-4 text-gray-500">
                    New user? <Link to="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
                </p>
            </div>
        </div>
    )
}