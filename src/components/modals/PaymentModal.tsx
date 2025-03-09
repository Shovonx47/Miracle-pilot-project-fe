import { useState } from 'react';
import PaymentMethodSelection from './PaymentMethodSelection';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function PaymentModal({ isOpen, onClose, onSubmit }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentMethods(true);
  };

  const handlePaymentMethodContinue = (method: 'bkash' | 'nagad') => {
    onSubmit(Number(amount));
    setAmount('');
    setShowPaymentMethods(false);
  };

  const handleBack = () => {
    setShowPaymentMethods(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {!showPaymentMethods ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  I want to pay BDT:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#48CB45] text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Pay Online
                </button>
              </div>
            </form>
          </>
        ) : (
          <PaymentMethodSelection
            amount={Number(amount)}
            onBack={handleBack}
            onContinue={handlePaymentMethodContinue}
          />
        )}
      </div>
    </div>
  );
} 