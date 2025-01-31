import React, { useState } from 'react';
import { checkoutApi } from '../../apis/Api';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault()
    const data = {
      amount,
    };

    try {
      const response = await checkoutApi(data)
      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error.response);
    }
  };

  const esewaCall = (formData) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Donate to AdoptAPet</h1>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              min="1"
              step="0.01"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">Thank you for your donation!</p>
          )}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;