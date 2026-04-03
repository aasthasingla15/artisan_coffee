'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useNotification } from '@/context/NotificationContext';
import { downloadInvoice, InvoiceData } from '@/utils/invoiceGenerator';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, processPayment, cartTotal, cartItems } = useCart();
  const { addNotification } = useNotification();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'processing' | 'success' | 'tracking'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    upiId: '',
    paypalEmail: ''
  });

  const handleClose = () => {
    if (step === 'processing') return; // Prevent closing while processing
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setStep('shipping');
      setPaymentMethod('card');
      setOrderId('');
      setFormData({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        upiId: '',
        paypalEmail: ''
      });
    }, 500); // Reset after closing animation
  };

  const handleDownloadInvoice = () => {
    const subtotal = cartTotal;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    const invoiceData: InvoiceData = {
      orderId,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.replace('$', '')),
        total: item.quantity * parseFloat(item.price.replace('$', ''))
      })),
      subtotal,
      tax,
      total,
      customerName: formData.name,
      date: new Date().toLocaleDateString(),
      currency: '$'
    };

    downloadInvoice(invoiceData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('review');
    else if (step === 'review') {
      setStep('processing');
      // Generate order ID
      const newOrderId = 'ART' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      processPayment().then(() => {
        setStep('success');
        addNotification('Order placed successfully! 🎉', 'success', 5000);
      });
    }
    else if (step === 'success') setStep('tracking');
  };

  const prevStep = () => {
    if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0A0503]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#1A0F0A] rounded-3xl shadow-2xl overflow-hidden border border-[#5A4034]/30"
          >
            {/* Close Button */}
            {step !== 'processing' && (
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#2D1810] flex items-center justify-center text-[#F5E6D3] hover:bg-[#3D2820] transition-colors z-10"
              >
                ✕
              </button>
            )}

            {/* Progress Indicator */}
            {step !== 'processing' && step !== 'success' && step !== 'tracking' && (
              <div className="px-8 pt-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#C9B8A0] font-['Inter']">Step {step === 'shipping' ? '1' : step === 'payment' ? '2' : '3'} of 3</span>
                  <span className="text-sm text-[#C9B8A0] font-['Inter']">
                    {step === 'shipping' ? 'Shipping' : step === 'payment' ? 'Payment' : 'Review'}
                  </span>
                </div>
                <div className="w-full bg-[#2D1810] rounded-full h-2">
                  <div 
                    className="bg-[#4F9C8F] h-2 rounded-full transition-all duration-300"
                    style={{ width: step === 'shipping' ? '33%' : step === 'payment' ? '66%' : '100%' }}
                  />
                </div>
              </div>
            )}

            {step === 'shipping' && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Order Summary Side */}
                <div className="bg-[#2D1810] p-8 md:w-2/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6">Order Summary</h3>
                    <div className="space-y-4 font-['Inter'] text-[#C9B8A0]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#5A4034]/30">
                    <div className="flex justify-between items-end">
                      <span className="text-lg text-[#F5E6D3]">Total</span>
                      <span className="text-3xl font-bold text-[#4F9C8F]">${(cartTotal + 5 + cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Form */}
                <div className="p-8 md:w-3/5">
                  <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6">Shipping Information</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Full Name</label>
                      <input 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Email Address</label>
                      <input 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Shipping Address</label>
                      <input 
                        required 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="123 Artisan Coffee St" 
                        className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">City</label>
                        <input 
                          required 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="New York" 
                          className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">ZIP</label>
                        <input 
                          required 
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="10001" 
                          className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                        />
                      </div>
                    </div>
                    <button
                      onClick={nextStep}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-[#4F9C8F]/40 transition-all active:scale-[0.98]"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Order Summary Side */}
                <div className="bg-[#2D1810] p-8 md:w-2/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6">Order Summary</h3>
                    <div className="space-y-4 font-['Inter'] text-[#C9B8A0]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#5A4034]/30">
                    <div className="flex justify-between items-end">
                      <span className="text-lg text-[#F5E6D3]">Total</span>
                      <span className="text-3xl font-bold text-[#4F9C8F]">${(cartTotal + 5 + cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="p-8 md:w-3/5">
                  <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card' 
                            ? 'border-[#4F9C8F] bg-[#4F9C8F]/10' 
                            : 'border-[#5A4034] bg-[#2D1810] hover:border-[#4F9C8F]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-8 h-5 bg-blue-600 rounded"></div>
                            <div className="w-8 h-5 bg-red-500 rounded"></div>
                          </div>
                          <span className="text-[#F5E6D3] font-semibold">Credit/Debit Card</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'upi' 
                            ? 'border-[#4F9C8F] bg-[#4F9C8F]/10' 
                            : 'border-[#5A4034] bg-[#2D1810] hover:border-[#4F9C8F]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">UPI</span>
                          </div>
                          <span className="text-[#F5E6D3] font-semibold">UPI</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'paypal' 
                            ? 'border-[#4F9C8F] bg-[#4F9C8F]/10' 
                            : 'border-[#5A4034] bg-[#2D1810] hover:border-[#4F9C8F]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PP</span>
                          </div>
                          <span className="text-[#F5E6D3] font-semibold">PayPal</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Form Based on Method */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">Card Information</label>
                        <div className="border border-[#5A4034] rounded-lg overflow-hidden bg-[#0A0503]">
                          <input 
                            required
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="1234 5678 9012 3456" 
                            className="w-full bg-transparent px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none border-b border-[#5A4034]"
                          />
                          <div className="flex">
                            <input 
                              required
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="MM / YY" 
                              className="w-1/2 bg-transparent px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none border-r border-[#5A4034]"
                            />
                            <input 
                              required
                              name="cvc"
                              value={formData.cvc}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="CVC" 
                              className="w-1/2 bg-transparent px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">UPI ID</label>
                        <input 
                          required
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="yourname@upi" 
                          className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                        />
                      </div>
                      <div className="bg-[#2D1810] p-4 rounded-lg">
                        <p className="text-sm text-[#C9B8A0] font-['Inter']">
                          💡 UPI is India&apos;s most popular digital payment method. Fast, secure, and instant transfers.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm text-[#C9B8A0] mb-2 font-['Inter']">PayPal Email</label>
                        <input 
                          required
                          name="paypalEmail"
                          value={formData.paypalEmail}
                          onChange={handleInputChange}
                          type="email" 
                          placeholder="your.email@paypal.com" 
                          className="w-full bg-[#0A0503] border border-[#5A4034] rounded-lg px-4 py-3 text-[#F5E6D3] placeholder:text-[#5A4034] focus:outline-none focus:border-[#4F9C8F] focus:ring-1 focus:ring-[#4F9C8F]"
                        />
                      </div>
                      <div className="bg-[#2D1810] p-4 rounded-lg">
                        <p className="text-sm text-[#C9B8A0] font-['Inter']">
                          🔒 You&apos;ll be redirected to PayPal to complete your secure payment.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-4 bg-[#2D1810] border border-[#5A4034] text-[#F5E6D3] rounded-xl text-lg font-semibold hover:bg-[#3D2820] transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-1 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-[#4F9C8F]/40 transition-all active:scale-[0.98]"
                    >
                      Review Order
                    </button>
                  </div>
                  <p className="text-xs text-center text-[#5A4034] mt-4 flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    Payments are secure and encrypted
                  </p>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-6">Review Your Order</h2>
                <div className="space-y-6">
                  <div className="bg-[#2D1810] p-6 rounded-xl">
                    <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-4">Shipping Information</h3>
                    <div className="text-[#C9B8A0] font-['Inter'] space-y-1">
                      <p>{formData.name}</p>
                      <p>{formData.email}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.zip}</p>
                    </div>
                  </div>
                  <div className="bg-[#2D1810] p-6 rounded-xl">
                    <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-4">Payment Method</h3>
                    <div className="text-[#C9B8A0] font-['Inter']">
                      {paymentMethod === 'card' && (
                        <>
                          <p>Credit/Debit Card ending in ****{formData.cardNumber.slice(-4)}</p>
                          <p>Expires {formData.expiry}</p>
                        </>
                      )}
                      {paymentMethod === 'upi' && (
                        <p>UPI ID: {formData.upiId}</p>
                      )}
                      {paymentMethod === 'paypal' && (
                        <p>PayPal: {formData.paypalEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#2D1810] p-6 rounded-xl">
                    <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-4">Order Summary</h3>
                    <div className="space-y-2 font-['Inter'] text-[#C9B8A0]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#5A4034]/30 flex justify-between items-end">
                        <span className="text-lg text-[#F5E6D3]">Total</span>
                        <span className="text-2xl font-bold text-[#4F9C8F]">${(cartTotal + 5 + cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-4 bg-[#2D1810] border border-[#5A4034] text-[#F5E6D3] rounded-xl text-lg font-semibold hover:bg-[#3D2820] transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-1 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl text-lg font-semibold shadow-xl hover:shadow-[#4F9C8F]/40 transition-all active:scale-[0.98]"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="p-16 flex flex-col items-center justify-center text-center h-[500px]">
                <div className="w-16 h-16 border-4 border-[#5A4034] border-t-[#4F9C8F] rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-2">Processing Payment...</h2>
                <p className="text-[#C9B8A0] font-['Inter']">Authorizing secure transaction</p>
              </div>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 flex flex-col items-center justify-center text-center h-[500px]"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30"
                >
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-2"
                >
                  Order Confirmed! 🎉
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-[#C9B8A0] font-['Inter'] mb-6 max-w-sm"
                >
                  Your artisan coffee order has been securely processed.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#2D1810] p-4 rounded-lg mb-6"
                >
                  <p className="text-sm text-[#C9B8A0] font-['Inter']">Order ID: <span className="text-[#4F9C8F] font-bold">{orderId}</span></p>
                  <p className="text-sm text-[#C9B8A0] font-['Inter']">Estimated delivery: 3-5 business days</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex gap-4"
                >
                  <button
                    onClick={handleDownloadInvoice}
                    className="px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl font-semibold shadow-xl hover:shadow-[#8B4513]/40 transition-all active:scale-[0.98] flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download Invoice
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-xl font-semibold shadow-xl hover:shadow-[#4F9C8F]/40 transition-all active:scale-[0.98]"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-[#2D1810] border border-[#5A4034] text-[#F5E6D3] rounded-xl font-semibold hover:bg-[#3D2820] transition-colors"
                  >
                    Continue Browsing
                  </button>
                </motion.div>
              </motion.div>
            )}

            {step === 'tracking' && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5E6D3] mb-2">Order Tracking</h2>
                  <p className="text-[#C9B8A0] font-['Inter']">Order ID: <span className="text-[#4F9C8F] font-bold">{orderId}</span></p>
                </div>

                <div className="max-w-2xl mx-auto">
                  {/* Tracking Progress */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5E6D3]">Order Placed</h3>
                        <p className="text-[#C9B8A0] font-['Inter'] text-sm">Your order has been confirmed and payment processed</p>
                        <p className="text-[#5A4034] font-['Inter'] text-xs mt-1">Today, {new Date().toLocaleTimeString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4F9C8F]/20 rounded-full flex items-center justify-center border border-[#4F9C8F]/30">
                        <svg className="w-6 h-6 text-[#4F9C8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5E6D3]">Shipped</h3>
                        <p className="text-[#C9B8A0] font-['Inter'] text-sm">Your order is being prepared and will ship soon</p>
                        <p className="text-[#5A4034] font-['Inter'] text-xs mt-1">Expected: Tomorrow</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2D1810] rounded-full flex items-center justify-center border border-[#5A4034]">
                        <svg className="w-6 h-6 text-[#5A4034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#5A4034]">Out for Delivery</h3>
                        <p className="text-[#5A4034] font-['Inter'] text-sm">Your order is on the way</p>
                        <p className="text-[#5A4034] font-['Inter'] text-xs mt-1">Expected: 2-3 days</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2D1810] rounded-full flex items-center justify-center border border-[#5A4034]">
                        <svg className="w-6 h-6 text-[#5A4034]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#5A4034]">Delivered</h3>
                        <p className="text-[#5A4034] font-['Inter'] text-sm">Package delivered successfully</p>
                        <p className="text-[#5A4034] font-['Inter'] text-xs mt-1">Expected: 3-5 days</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8">
                    <div className="w-full bg-[#2D1810] rounded-full h-3">
                      <div className="bg-[#4F9C8F] h-3 rounded-full transition-all duration-1000" style={{ width: '25%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#5A4034] font-['Inter']">
                      <span>Order Placed</span>
                      <span>Shipped</span>
                      <span>Out for Delivery</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 bg-[#2D1810] border border-[#5A4034] text-[#F5E6D3] rounded-xl font-semibold hover:bg-[#3D2820] transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
