import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isToday, isYesterday } from 'date-fns'; // Using date-fns for date formatting

const NewOrders = () => {
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://saroma-foods-backend-2.onrender.com/saarofoods/customerdata');
        const groupedData = response.data.reduce((acc, order) => {
          const orderDate = format(new Date(order.createdAt), 'yyyy-MM-dd');
          if (!acc[orderDate]) acc[orderDate] = [];
          acc[orderDate].push(order);
          return acc;
        }, {});
        setCustomerData(groupedData);
      } catch (error) {
        console.log('Customer data is not fetched', error);
      }
    }

    fetchData();
  }, []);


  const downloadPDF = async (customer) => {
    try {
      const response = await axios.post('https://saroma-foods-backend-2.onrender.com/saarofoods/download-pdf', customer, {
        responseType: 'blob', 
      });


      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${customer.name}_Order.pdf`); 
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF', error);
    }
  };

  const getDateLabel = (date) => {
    const orderDate = new Date(date);
    if (isToday(orderDate)) return 'Today';
    if (isYesterday(orderDate)) return 'Yesterday';
    return format(orderDate, 'MMMM dd, yyyy'); 
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-600">New Orders</h1>
      </div>

      {Object.keys(customerData).length > 0 ? (
        Object.keys(customerData)
          .sort((a, b) => new Date(b) - new Date(a)) 
          .map((date) => (
            <div key={date} className="mb-6">
              {/* Display the date header with the count of orders */}
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-teal-600">
                {getDateLabel(date)} - {customerData[date].length} Order(s)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md mb-6">
                  <thead className="bg-teal-600 text-white">
                    <tr className="text-sm md:text-base">
                      <th className="py-2 md:py-3 px-3 md:px-6 text-left">Name</th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-left">Phone No</th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-center">Address</th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-left">Date & Time</th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData[date].map((customer, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100 text-xs md:text-sm"
                      >
                        <td className="py-2 md:py-3 px-3 md:px-6">{customer.name}</td>
                        <td className="py-2 md:py-3 px-3 md:px-6">{customer.phoneNo}</td>
                        <td className="py-2 md:py-3 px-3 md:px-6">{customer.address}</td>
                        <td className="py-2 md:py-3 px-3 md:px-6">
                          {new Date(customer.createdAt).toLocaleString()}
                        </td>
                        <td className="py-2 md:py-3 px-3 md:px-6">
                          <button
                            onClick={() => downloadPDF(customer)}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded text-xs md:text-sm"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
      ) : (
        <div className="text-center text-gray-500">No orders found.</div>
      )}
    </div>
  );
};

export default NewOrders;
