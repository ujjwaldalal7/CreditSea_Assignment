import React, { useEffect, useState } from "react";

const App = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reports");
        const data = await res.json();
        if (data.length > 0) {
          setReport(data[data.length - 1]); // latest report
        }
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-500 text-lg">Loading report...</div>;

  if (!report)
    return <div className="text-center mt-20 text-red-500 text-lg">No report data found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
        Credit Report Dashboard
      </h1>

      {/* Basic Details */}
      <section className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <p><span className="font-medium">Name:</span> {report.name}</p>
          <p><span className="font-medium">Mobile:</span> {report.mobile}</p>
          <p><span className="font-medium">Credit Score:</span> {report.creditScore}</p>
        </div>
      </section>

      {/* Report Summary */}
      <section className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Report Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <p><strong>Total Accounts:</strong> {report.totalAccounts}</p>
          <p><strong>Active Accounts:</strong> {report.activeAccounts}</p>
          <p><strong>Closed Accounts:</strong> {report.closedAccounts}</p>
          <p><strong>Current Balance:</strong> ₹{report.currentBalance}</p>
          <p><strong>Secured Balance:</strong> ₹{report.securedAmount}</p>
          <p><strong>Unsecured Balance:</strong> ₹{report.unsecuredAmount}</p>
          <p><strong>Last 7 Days Enquiries:</strong> {report.last7DaysEnquiries}</p>
        </div>
      </section>

      {/* Credit Accounts */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Credit Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-2 text-left">Bank</th>
                <th className="p-2 text-left">Account #</th>
                <th className="p-2 text-left">Current Balance</th>
                <th className="p-2 text-left">Amount Past Due</th>
                <th className="p-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {report.accounts.map((acc) => (
                <tr key={acc._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{acc.bank}</td>
                  <td className="p-2">{acc.accountNumber}</td>
                  <td className="p-2">₹{acc.currentBalance}</td>
                  <td className="p-2">₹{acc.amountPastDue}</td>
                  <td className="p-2">{acc.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default App;
