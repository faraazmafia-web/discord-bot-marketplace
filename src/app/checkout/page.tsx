import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const { control, handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      console.error(error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // Send paymentMethod.id to your server to create a charge
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="card"
        control={control}
        render={({ field }) => <CardElement {...field} />}
      />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutPage;