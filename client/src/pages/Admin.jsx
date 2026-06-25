import React, { useState, useEffect } from "react";
import { contractABI } from "../DonateMeABI";
import web3 from "../web3";

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    setIsLoading(true);
    try {
      const myContract = new web3.eth.Contract(
        contractABI,
        "0xe02CD584c03CbBe75f4b7fd671b0537b32679DC3",
      );
      myContract.methods
        .getAllPayments()
        .call()
        .then((values) => {
          setPayments(values);
        });
    } catch (error) {
      console.error("Failed to fetch all payments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchAddress.trim()) {
      return fetchAllPayments();
    }

    setIsLoading(true);
    try {
      console.log(`Fetching contract data for: ${searchAddress}`);

      const myContract = new web3.eth.Contract(
        contractABI,
        "0xe02CD584c03CbBe75f4b7fd671b0537b32679DC3",
      );
      myContract.methods
        .getUserPayments(searchAddress)
        .call()
        .then((values) => {
          setPayments(values);
        });
        console.log("all Done")
    } catch (error) {
      console.error("Search failed", error);
      setPayments([]); // Clear table if search fails
    } finally {
      setIsLoading(false);
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatEth = (weiAmount) => {
    const eth = Number(weiAmount) / 1e18;
    return eth.toFixed(5); // Adjust decimal places as needed
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 md:p-10 font-[satoshi]">
      <title>Admin Dashboard</title>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              View and manage all your Buy Me A Coffee donations.
            </p>
          </div>

          {/* Search Bar Component */}
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-3">
            <div className="relative w-full md:w-80">
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Wallet Address (0x...)"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full h-10 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
            {searchAddress && (
              <button
                type="button"
                onClick={() => {
                  setSearchAddress("");
                  fetchAllPayments();
                }}
                className="h-10 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-all border border-gray-300 shadow-sm cursor-pointer"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Data Table Section */}
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Wallet Address</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4 text-right pr-6">Amount (ETH)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-500">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          className="animate-spin h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading payments...
                      </div>
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-500">
                      No payments found for this criteria.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* User Column */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                            <span className="text-blue-700 text-xs font-bold">
                              {payment.user.substring(2, 4)}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium font-mono text-sm tracking-tight">
                            {truncateAddress(payment.user)}
                          </span>
                        </div>
                      </td>

                      {/* Email Column */}
                      <td className="p-4">
                        {payment.email ? (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            {payment.email}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            No email provided
                          </span>
                        )}
                      </td>

                      {/* Amount Column */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex justify-end items-baseline gap-1">
                          <span className="text-gray-900 font-semibold">
                            {formatEth(payment.amount)}
                          </span>
                          <span className="text-gray-500 text-xs font-medium">
                            ETH
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
