import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewOrders = () => {
  const [customerData, setCustomerData] = useState([]);

  //https://saroma-foods-backend-1.onrender.com/saarofoods/customerdata
  //https://saroma-foods-backend-1.onrender.com/saarofoods/download-pdf

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://saroma-foods-backend-2.onrender.com/saarofoods/customerdata');
        setCustomerData(response.data);
      } catch (error) {
        console.log('Customer data is not fetched', error);
      }
    }

    fetchData();
  }, []);

  // Function to download PDF for a specific customer
  const downloadPDF = async (customer) => {
    try {
      const response = await axios.post('https://saroma-foods-backend-2.onrender.com/saarofoods/download-pdf', customer, {
        responseType: 'blob', // Important to handle binary data
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${customer.name}_Order.pdf`); // File name based on customer name
      document.body.appendChild(link);
      link.click();

      // Cleanup after download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF', error);
    }
  };

  return (
    <div className="p-4 md:p-8  min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-600">New Orders</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-teal-600 text-white">
            <tr className="text-sm md:text-base">
              <th className="py-2 md:py-3 px-3 md:px-6 text-left">Name</th>
              <th className="py-2 md:py-3 px-3 md:px-6 text-left">Landmark</th>
              <th className="py-2 md:py-3 px-3 md:px-6 text-left">Phone No</th>
              <th className="py-2 md:py-3 px-3 md:px-6 text-center">Address</th>
              <th className="py-2 md:py-3 px-3 md:px-6 text-left">Date & Time</th>
              <th className="py-2 md:py-3 px-3 md:px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length > 0 ? (
              customerData.map((customer, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 text-xs md:text-sm"
                >
                  <td className="py-2 md:py-3 px-3 md:px-6 ">{customer.name}</td>
                  <td className="py-2 md:py-3 px-3 md:px-6">{customer.landMark}</td>
                  <td className="py-2 md:py-3 px-3 md:px-6">{customer.phoneNo}</td>
                  <td className="py-2 md:py-3 px-3 md:px-6">{customer.address}</td>
                  <td className="py-2 md:py-3 px-3 md:px-6"> {new Date(customer.createdAt).toLocaleString()}</td>

                 
                  <td className="py-2 md:py-3 px-3 md:px-6">
                    <button
                      onClick={() => downloadPDF(customer)}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded text-xs md:text-sm"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewOrders;
