import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

const UPIPayment = ({onClose}) => {
  const [amount, setAmount] = useState("100");
  const [hasPaid, setHasPaid] = useState(false);
  const ModalRef = useRef()
  const myUpiId = import.meta.env.VITE_UPI_ID ?? "";
  const myName = import.meta.env.VITE_UPI_NAME ?? "";

  
  const upiLink = `upi://pay?pa=${myUpiId}&pn=${encodeURIComponent(myName)}&am=${amount}&cu=INR`;
    console.log(upiLink)
  const handlePaymentDone = () => {
    
    setHasPaid(true);
    alert(
      "Thank you for the coffee! Contact Me to Collaborate further...",
    );
  };

  const closeModal = (e)=>{
    if(ModalRef.current == e.target)
    {
        onClose()
    }
  }

  return (
    <div ref={ModalRef} onClick={(e)=>{closeModal(e)}} className="w-full min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center fixed">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Buy Me a Coffee ☕
        </h2>
        <p className="text-gray-500 mb-6">Pay securely via any UPI App</p>

        {/* Amount Selector */}
        <div className="mb-6 flex justify-center items-center space-x-2">
          <span className="text-xl font-semibold text-gray-700">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-24 px-3 py-2 border-b-2 border-indigo-500 focus:outline-none text-xl font-bold text-center"
            min="1"
          />
        </div>

        {!hasPaid ? (
          <div className="flex flex-col items-center justify-center">
            {}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6 flex items-center flex-col">
              <QRCodeSVG
                value={upiLink}
                size={180}
                level={"H"}
                includeMargin={true}
              />
              <p className="text-sm text-gray-400 mt-2">
                Scan with GPay, PhonePe, or Paytm
              </p>
            </div>

            {}
            <p className="text-sm text-gray-500 mb-2">
              Or if you are on mobile:
            </p>
            <a
              href={upiLink}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mb-4 block"
            >
              Tap to Pay on Mobile
            </a>

            <button
              onClick={handlePaymentDone}
              className="text-indigo-600 font-medium hover:underline text-sm"
            >
              I have made the payment
            </button>
          </div>
        ) : (
          <div className="py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Payment Received!
            </h3>
            <p className="text-gray-600">Thank you so much for your support!</p>
            <button
              onClick={() => setHasPaid(false)}
              className="mt-6 text-indigo-500 hover:underline text-sm"
            >
              Send another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPayment;
