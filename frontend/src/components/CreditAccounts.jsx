import { formatCurrency } from "../utils/formatCurrency";
import { Banknote, Clock, TrendingDown } from "lucide-react";

const CreditAccounts = ({ accounts }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 transition-all duration-300">
    <h3 className="text-xl font-bold mb-6 text-teal-400 border-b border-teal-400/30 pb-2">Detailed Credit Accounts</h3>
    
    <div className="grid md:grid-cols-2 gap-6">
      {accounts?.length > 0 ? (
        accounts.map((acc, i) => (
          <div 
            key={i} 
            className={`border rounded-xl p-5 shadow-lg transition-all duration-500 transform hover:shadow-lg hover:scale-[1.01] ${acc.isWrittenOff ? 'border-red-500/50 bg-red-900/20' : acc.amountOverdue > 0 ? 'border-yellow-500/50 bg-yellow-900/20' : 'border-gray-700 bg-gray-900/50'}`}
          >
            {/* Header: Bank and Account Type */}
            <div className="flex justify-between items-start mb-3 border-b border-gray-700 pb-2">
                <h4 className="font-extrabold text-white text-lg flex items-center">
                    <Banknote className="w-5 h-5 mr-2 text-blue-400" /> {acc.bank}
                </h4>
                <span className="text-xs font-semibold text-teal-400 bg-gray-700 px-3 py-1 rounded-full">{acc.accountTypeDescription}</span>
            </div>

            {/* Account Status and Number */}
            <p className="text-sm mb-2">
                <span className="font-semibold text-gray-400">Status:</span> 
                <span className={`ml-2 font-bold ${acc.accountStatusDescription.includes('Active') ? 'text-green-400' : acc.accountStatusDescription.includes('Closed') ? 'text-yellow-400' : 'text-red-400'}`}>
                    {acc.accountStatusDescription}
                </span>
            </p>
            <p className="text-sm text-gray-400">Account No: <span className="font-mono text-gray-300">{acc.accountNumber}</span></p>

            {/* Financials Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="text-xs text-gray-500">Current Balance</p>
                    <p className="text-base font-bold text-white">{formatCurrency(acc.currentBalance)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Amount Overdue</p>
                    <p className={`text-base font-bold ${acc.amountOverdue > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {formatCurrency(acc.amountOverdue)}
                    </p>
                </div>
            </div>

            {/* Dates and Flags */}
            <div className="mt-4 pt-3 border-t border-gray-700 text-xs text-gray-500">
                <p>Opened: {acc.dateOpened ? new Date(acc.dateOpened).toLocaleDateString() : 'N/A'}</p>
                {acc.dateClosed && <p>Closed: {new Date(acc.dateClosed).toLocaleDateString()}</p>}
                
                {acc.isWrittenOff && (
                    <p className="text-red-400 font-bold mt-2 flex items-center animate-pulse">
                        <TrendingDown className="w-4 h-4 mr-1"/> WRITTEN OFF STATUS
                    </p>
                )}
            </div>
          </div>
        ))
      ) : (
          <p className="text-gray-400 md:col-span-2 text-center py-8">No detailed credit accounts found for this report.</p>
      )}
    </div>
  </div>
);
export default CreditAccounts;