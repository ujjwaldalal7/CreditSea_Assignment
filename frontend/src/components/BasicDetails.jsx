const BasicDetails = ({ info }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all">
    <h3 className="text-lg font-semibold mb-4 text-blue-400">Basic Details</h3>
    <ul className="space-y-2 text-sm">
      <li><b>Name:</b> {info?.name}</li>
      <li><b>Mobile:</b> {info?.mobile}</li>
      <li><b>PAN:</b> {info?.pan}</li>
      <li><b>Credit Score:</b> {info?.creditScore}</li>
    </ul>
  </div>
);
export default BasicDetails;