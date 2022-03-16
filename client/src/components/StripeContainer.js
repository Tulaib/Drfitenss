/*eslint-disable*/
// import { Elements } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"
// import React from "react"
// import PaymentForm from "./PaymentForm"

// const PUBLIC_KEY = "pk_test_51KV05EE6nbSSxCIjDdge9ne28bMevfze801LCN1dSWAHlDFyJLwXp1ayUTROsqwnvnMCXSP0nF1yM4KdcrJtoZ9L00KeoYgGCs"

// const stripeTestPromise = loadStripe(PUBLIC_KEY)

// export default function StripeContainer() {
// 	return (
// 		<Elements stripe={stripeTestPromise}>
// 			<PaymentForm />
// 		</Elements>
// 	)
// }

// export default StripeContainer

import React from 'react';
import ReactDOM from 'react-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import './stripecontainer.css';

toast.configure();

export default function StripeContainer() {

  const [product] = React.useState({
    name: 'Tesla Roadster',
    price: 1.00,
    description: 'Cool car',
  });

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:4000/checkout', {
      token,
      product,
    });
    const { status } = response.data;
    if (status === 'success') {
      toast('Success! Check email for details', { type: 'success' });
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  }
    return (
      <div className="container">
        <div className="product">
          <h1>{product.name}</h1>
          <h3>On Sale · ${product.price}</h3>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51KV05EE6nbSSxCIjDdge9ne28bMevfze801LCN1dSWAHlDFyJLwXp1ayUTROsqwnvnMCXSP0nF1yM4KdcrJtoZ9L00KeoYgGCs"
          token={handleToken}
          amount={product.price * 100}
          name="Tesla Roadster"
          billingAddress
          shippingAddress
        />
      </div>
    );
  
}
