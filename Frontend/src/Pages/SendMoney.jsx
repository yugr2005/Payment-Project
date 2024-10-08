import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function SendMoney() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    async function handleSendMoney() {
        setError(''); // Reset any previous error
        try {
            const response = await axios.post(`https://backend-paytm.vercel.app/user/transfer/${id}`, {
                amount: Number(amount)
            }, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);
            alert(`Amount of $${amount} has been sent successfully! ${response.data.msg} is your new balance.`);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError('Failed to send money. Please try again.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Send Money</h1>
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    className="border border-gray-300 rounded-md shadow-sm p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    onClick={handleSendMoney}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
