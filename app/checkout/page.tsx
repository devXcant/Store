import CheckoutPage from '@/components/Frontend/CheckoutPage'
import convertToSubCurrency from '@/lib/convertsubcurrency'
import React from 'react'

const CheckoutUI = () => {
    const amount = 49.99;
  return (
    <div><CheckoutPage amount={convertToSubCurrency(amount)} /></div>
  )
}

export default CheckoutUI
