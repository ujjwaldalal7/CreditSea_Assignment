import {formatCurrency} from '../utils/formatCurrency';
const BasicDetails = ({ info }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-0.5">
    <h3 className="text-xl font-bold mb-4 text-teal-400 border-b border-teal-400/30 pb-2">User Identity</h3>
    <ul className="space-y-3 text-sm text-gray-300">
      <li className="flex justify-between items-center">
        <span className="font-medium text-gray-200">Name:</span> <span className="text-right">{info?.name}</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-medium text-gray-200">Mobile:</span> <span className="text-right">{info?.mobile}</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-medium text-gray-200">PAN:</span> <span className="text-right text-yellow-400">{info?.pan}</span>
      </li>
      <li className="flex justify-between items-center">
        <span className="font-medium text-gray-200">Date of Birth:</span> <span className="text-right">{info?.dateOfBirth}</span>
      </li>
      <li className="pt-3 border-t border-gray-700">
        <span className="font-medium text-gray-200 block mb-1">Address:</span>
        <span className="text-xs italic text-gray-400 block break-words">{info?.fullAddress}</span>
      </li>
    </ul>
    {/* Animated Credit Score Banner */}
    <div className="mt-6 p-3 bg-blue-600 rounded-lg text-center shadow-lg animate-pulse-once">
        <p className="text-xs font-semibold uppercase text-blue-200">Credit Score</p>
        <p className="text-4xl font-extrabold text-white">{info?.creditScore}</p>
    </div>
  </div>
);
export default BasicDetails;