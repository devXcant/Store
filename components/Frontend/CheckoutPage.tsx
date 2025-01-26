"use client";
import React, { use, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertsubcurrency";


const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<String>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(clientSecret);


  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `/success?amount=${amount}`,
      },
    });
  };
  return (
    <div className="flex justify-center items-center transform translate-x-1/6 translate-y-1/2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded-md w-[500px] "
      >
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
        <button
          className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 transition-all duration-300 w-full h-[40px] my-10 disabled:opacity-50 disabled:animate-pulse"
          disabled={!stripe || loading}
        >
          {!loading ? `Pay $${amount}` : `Processing...`}{" "}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
