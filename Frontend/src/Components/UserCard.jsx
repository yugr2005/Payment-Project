import { useNavigate } from "react-router-dom";

export function UserCard({ data }) {
    const navigate = useNavigate();
    const username = encodeURIComponent(data.username);

    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition ease-in-out duration-500 transform hover:scale-105 easeborder border-gray-200">
            <div className="flex items-center">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold mr-4">
                    {data.username.charAt(0)} {/* Display first letter of username */}
                </div>
                <h1 className="text-xl font-semibold text-gray-700">{data.username}</h1>
            </div>
            <button
                onClick={() => navigate(`/sendMoney/${username}`)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg"
            >
                Send Money
            </button>
        </div>
    );
}
