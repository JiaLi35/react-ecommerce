import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { verifyPayment } from "../utils/api_payment";

const PaymentVerify = () => {
  // 1. call the search params hook
  const [searchParams] = useSearchParams(); // extract the value from the url string (the data after the ?)
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");
  const navigate = useNavigate();

  useEffect(() => {
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    )
      .then((updatedOrder) => {
        // clear the cart
        localStorage.removeItem("cart");
        // redirect the user to orders page
        navigate("/orders");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      Please wait while we verify your transaction. Please don't click the go
      back button or close the browser.
    </>
  );
};

export default PaymentVerify;
