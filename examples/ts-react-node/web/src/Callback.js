import React, { useEffect, useState } from "react";

const PaymentCallback = () => {
  const [paymentData, setPaymentData] = useState({
    status: "",
    reference: "",
    trxref: "",
  });

  useEffect(() => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");
    const reference = queryParams.get("reference");
    const trxref = queryParams.get("trxref");

    // Update state with payment data
    setPaymentData({ status, reference, trxref });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h2>Payment Status</h2>
      {paymentData.status ? (
        <div>
          <p><strong>Status:</strong> {paymentData.status}</p>
          <p><strong>Payment Reference:</strong> {paymentData.reference}</p>
          <p><strong>Transaction Reference:</strong> {paymentData.trxref}</p>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}

      <p>
        {paymentData.status === "successful" && "Thank you for your payment! It was processed successfully."}
        {paymentData.status === "failed" && "Unfortunately, your payment failed. Please try again."}
        {paymentData.status && paymentData.status !== "successful" && paymentData.status !== "failed" && 
          "Payment status is unclear. Please contact support if needed."}
      </p>
    </div>
  );
};

export default PaymentCallback;
