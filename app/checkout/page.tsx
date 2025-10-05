"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../../contexts/cart-context"
import { useOrder } from "../../contexts/order-context"
import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCart()
  const { createOrder } = useOrder()
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Shipping Information
    name: "",
    email: "",
    phone: "", // Added phone for OTP
    address: "",
    city: "",
    zipCode: "",
    country: "IN", // Default to India

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Payment Method
    paymentMethod: "credit-card",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phone) newErrors.phone = "Phone number is required" // Added phone validation
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.zipCode) newErrors.zipCode = "PIN code is required" // Changed to PIN code
    if (!formData.country) newErrors.country = "Country is required"

    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
      if (!formData.cvv) newErrors.cvv = "CVV is required"
      if (!formData.cardName) newErrors.cardName = "Cardholder name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    setShowOtpModal(true)
    // Simulate SMS sending
    alert(`OTP sent to ${formData.phone}: ${newOtp}`)
  }

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setShowOtpModal(false)
      processOrder()
    } else {
      setErrors({ otp: "Invalid OTP. Please try again." })
    }
  }

  const processOrder = async () => {
    try {
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3)

      // Create order
      const orderId = createOrder({
        items: cartState.items,
        total: cartState.total,
        status: "processing",
        deliveryDate: deliveryDate.toLocaleDateString("en-IN"), // Added delivery date
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone, // Added phone to shipping address
        },
        paymentMethod:
          formData.paymentMethod === "credit-card"
            ? `**** **** **** ${formData.cardNumber.slice(-4)}`
            : formData.paymentMethod,
      })

      console.log("[v0] Order created successfully:", orderId)

      // Clear cart
      clearCart()

      // Redirect to success page
      router.push(`/checkout/success?orderId=${orderId}`)
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      setErrors({ submit: "Failed to process order. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    generateOtp()
    setIsProcessing(false)
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8">Your cart is empty</h1>
          <Link href="/shop" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg border-2 border-red-900 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Verify OTP</h3>
            <p className="text-gray-300 mb-4">Enter the OTP sent to {formData.phone} for delivery verification</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="creepy-input w-full px-4 py-3 rounded-lg mb-4"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            {errors.otp && <p className="text-red-400 text-sm mb-4">{errors.otp}</p>}
            <div className="flex space-x-4">
              <button onClick={verifyOtp} className="creepy-button flex-1 py-3 px-4 rounded-lg font-semibold">
                Verify OTP
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link href="/shop" className="text-gray-400 hover:text-white mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-4xl font-bold text-red-600">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-gray-900 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="flex">
                    <span className="bg-gray-800 text-white px-3 py-2 rounded-l-lg border-r border-gray-700">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-gray-400 text-sm mt-1">
                    OTP will be sent to this number for delivery verification
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="123 Horror Street"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">PIN Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="400001"
                      maxLength={6}
                    />
                    {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleInputChange}
                      className="text-red-600"
                    />
                    <label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleInputChange}
                      className="text-red-600"
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="apple-pay"
                      name="paymentMethod"
                      value="apple-pay"
                      checked={formData.paymentMethod === "apple-pay"}
                      onChange={handleInputChange}
                      className="text-red-600"
                    />
                    <label htmlFor="apple-pay">Apple Pay</label>
                  </div>
                </div>
              </div>

              {/* Credit Card Details */}
              {formData.paymentMethod === "credit-card" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="John Doe"
                      />
                      {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Complete Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{cartState.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 18%):</span>
                <span>₹{(cartState.total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-red-400">₹{(cartState.total + 99 + cartState.total * 0.18).toFixed(2)}</span>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Estimated Delivery:</strong> 3-5 business days
                </p>
                <p className="text-sm text-gray-300 mt-1">OTP verification required at delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
