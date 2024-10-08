import axios from "axios";
import { useEffect, useState } from "react";
import { UserCard } from "../Components/UserCard";

export function Dashboard() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentuser, setCurrenuser] = useState("");
    const [balance, setBalance] = useState(0);

    async function handleGetBalance() {
        await axios.get("https://backend-paytm.vercel.app/user/getBalance", {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setBalance(res.data.balance);
            setCurrenuser(res.data.username);
        });
    }

    async function handleSearch() {
        await axios.post("https://backend-paytm.vercel.app/user/getUser", { search: search }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setUsers(res.data.users);
        })
        .catch((err) => {
            console.log(err);
            setUsers([]);
        });
    }

    useEffect(() => {
        handleSearch();
    }, [search]);

    useEffect(() => {
        handleGetBalance();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* User Info Section */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome, <span className="text-blue-600">{currentuser}</span>
                    </h1>
                    <p className="text-lg text-gray-500">
                        Manage your transactions and account details below.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500 text-lg">Your Current Balance</p>
                    <h2 className="text-3xl font-semibold text-green-600">${balance}</h2>
                </div>
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Users"
                className="w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.length > 0 ? (
                    users
                    .filter(user => user.username !== currentuser) // Filter out the current user
                    .map((user, index) => (
                        <UserCard key={index} data={user} />
                    ))
                ) : (
                    <p className="text-gray-600">User not found</p>
                )}
            </div>
        </div>
    );
}
