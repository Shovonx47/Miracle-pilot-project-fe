import Image from 'next/image';
import { useState } from 'react';
import bkashLogo from '@/assets/payment/Bkash.webp';
import nagadLogo from '@/assets/payment/Nagad.png';

interface PaymentMethodSelectionProps {
  amount: number;
  onBack: () => void;
  onContinue: (method: 'bkash' | 'nagad') => void;
}

interface TransactionDetails {
  amount: number;
  convenienceFee: number;
  vatAmount: number;
  totalAmount: number;
}

export default function PaymentMethodSelection({ amount, onBack, onContinue }: PaymentMethodSelectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | null>(null);
  const [showTransactionSlip, setShowTransactionSlip] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const calculateTransactionDetails = (method: 'bkash' | 'nagad') => {
    const convenienceRate = method === 'bkash' ? 0.015 : 0.0149;
    const convenienceFee = amount * convenienceRate;
    const vatRate = 0.15;
    const vatAmount = convenienceFee * vatRate;
    const totalAmount = amount + convenienceFee + vatAmount;

    return {
      amount,
      convenienceFee,
      vatAmount,
      totalAmount
    };
  };

  const handleContinue = () => {
    if (!selectedMethod) return;
    
    const details = calculateTransactionDetails(selectedMethod);
    setTransactionDetails(details);
    setShowTransactionSlip(true);
  };

  const validatePhoneNumber = (number: string) => {
    const bangladeshiPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bangladeshiPhoneRegex.test(number)) {
      setPhoneError('Please enter a valid Bangladeshi phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleProceedPayment = async () => {
    if (!selectedMethod || !transactionDetails || isProcessing) return;
    if (!validatePhoneNumber(phoneNumber)) return;

    try {
      setIsProcessing(true);

      // TODO: Replace with actual production credentials
      const store_id = "mirac67c7270803987"; // This is a sandbox/test ID
      const store_passwd = "mirac67c7270803987@ssl"; // This is a sandbox/test password

      const transactionId = "TRAN_" + new Date().getTime();

      // Prepare payment data
      const paymentData = {
        store_id,
        store_passwd,
        total_amount: transactionDetails.totalAmount.toFixed(2),
        currency: "BDT",
        tran_id: transactionId,
        success_url: `${window.location.origin}/payment/success`,
        fail_url: `${window.location.origin}/payment/fail`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        ipn_url: `${window.location.origin}/api/ipn`,
        cus_name: "Customer Name",
        cus_email: "customer@email.com",
        cus_phone: phoneNumber,
        cus_add1: "Customer Address",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        shipping_method: "NO",
        product_name: "School Fees",
        product_category: "Education",
        product_profile: "general",
        num_of_item: "1",
        shipping_cost: "0.00",
        product_amount: transactionDetails.amount.toFixed(2),
        vat: transactionDetails.vatAmount.toFixed(2),
        discount_amount: "0.00",
        convenience_fee: transactionDetails.convenienceFee.toFixed(2),
        emi_option: "0",
        multi_card_name: "",
        allowed_bin: "",
        csrftoken: "",
        ship_name: "",
        ship_add1: "",
        ship_city: "",
        ship_postcode: "",
        ship_country: "Bangladesh",
        value_a: transactionId,
        value_b: "School Fee Payment",
        value_c: selectedMethod,
        value_d: transactionDetails.totalAmount.toFixed(2)
      } as const;

      // NOTE: This is sandbox/test environment URL
      // For real transactions, use: https://securepay.sslcommerz.com/gwprocess/v4/api.php
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

      // Display warning for test environment
      alert('⚠️ This is a test environment. No real money will be deducted from your bKash account.\n\nTo process real payments, the school needs to:\n1. Get real SSLCommerz credentials\n2. Set up real bKash Merchant account\n3. Configure production endpoints');

      for (const key in paymentData) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = paymentData[key as keyof typeof paymentData];
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showTransactionSlip && transactionDetails) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
          <button onClick={() => setShowTransactionSlip(false)} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-center mb-4">
            <Image
              src={selectedMethod === 'bkash' ? bkashLogo : nagadLogo}
              alt={selectedMethod === 'bkash' ? 'bKash' : 'Nagad'}
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Amount:</span>
              <span className="font-semibold">{transactionDetails.amount.toFixed(2)} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gateway Charge ({selectedMethod === 'bkash' ? '1.5%' : '1.49%'}):</span>
              <span className="font-semibold">{transactionDetails.convenienceFee.toFixed(2)} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT (15% on Gateway Charge):</span>
              <span className="font-semibold">{transactionDetails.vatAmount.toFixed(2)} BDT</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Payable:</span>
              <span>{transactionDetails.totalAmount.toFixed(2)} BDT</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your {selectedMethod === 'bkash' ? 'bKash' : 'Nagad'} account number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (phoneError) validatePhoneNumber(e.target.value);
            }}
            placeholder="01XXXXXXXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}
        </div>

        <button
          onClick={handleProceedPayment}
          disabled={isProcessing || !phoneNumber}
          className="w-full py-3 bg-[#48CB45] text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        </button>
        <button
          onClick={() => setShowTransactionSlip(false)}
          disabled={isProcessing}
          className="w-full mt-2 py-3 text-gray-600 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {/* Bkash Option */}
        <div
          onClick={() => setSelectedMethod('bkash')}
          className={`w-full h-16 relative rounded-lg border-2 cursor-pointer transition-all flex items-center px-4 ${
            selectedMethod === 'bkash' ? 'border-[#E2136E]' : 'border-gray-200'
          }`}
        >
          <Image
            src={bkashLogo}
            alt="bKash"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className={`w-5 h-5 rounded-full border-2 bg-white ${
              selectedMethod === 'bkash' ? 'border-[#E2136E]' : 'border-gray-300'
            }`}>
              {selectedMethod === 'bkash' && (
                <div className="w-3 h-3 bg-[#E2136E] rounded-full m-0.5" />
              )}
            </div>
          </div>
        </div>

        {/* Nagad Option */}
        <div
          onClick={() => setSelectedMethod('nagad')}
          className={`w-full h-16 relative rounded-lg border-2 cursor-pointer transition-all flex items-center px-4 ${
            selectedMethod === 'nagad' ? 'border-[#F42F4C]' : 'border-gray-200'
          }`}
        >
          <Image
            src={nagadLogo}
            alt="Nagad"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className={`w-5 h-5 rounded-full border-2 bg-white ${
              selectedMethod === 'nagad' ? 'border-[#F42F4C]' : 'border-gray-300'
            }`}>
              {selectedMethod === 'nagad' && (
                <div className="w-3 h-3 bg-[#F42F4C] rounded-full m-0.5" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between text-sm mb-4">
          <span>Amount:</span>
          <span>{amount} BDT</span>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedMethod}
        className="w-full mt-6 py-3 bg-[#3B82F6] text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      <button
        onClick={onBack}
        className="w-full mt-2 py-3 text-gray-600 rounded-md border border-gray-300"
      >
        Close
      </button>
    </div>
  );
} 