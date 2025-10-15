import { formatCurrency } from "../utils/formatCurrency";

const CreditAccounts = ({ accounts }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all">
    <h3 className="text-lg font-semibold mb-4 text-blue-400">Credit Accounts</h3>
    <div className="space-y-4">
      {accounts?.length > 0 ? (
        accounts.map((acc, i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4">
            <p><b>Bank:</b> {acc.bank}</p>
            <p><b>Account No:</b> {acc.accountNumber}</p>
            <p><b>Type:</b> {acc.type}</p>
            <p><b>Current Balance:</b> {formatCurrency(acc.currentBalance)}</p>
            <p className={acc.amountOverdue > 0 ? "text-red-400" : "text-green-400"}>
                <b>Overdue:</b> {formatCurrency(acc.amountOverdue)}
            </p>
          </div>
        ))
      ) : (
          <p className="text-gray-400">No detailed credit accounts found.</p>
      )}
    </div>
  </div>
);
export default CreditAccounts;