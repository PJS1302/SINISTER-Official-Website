"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useOrder } from "../../../contexts/order-context"
import Header from "../../../components/header"
import CartPanel from "../../../components/cart-panel"
import WishlistModal from "../../../components/wishlist-modal"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

const trackingSteps = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle },
]

const statusColors = {
  pending: "text-yellow-400 bg-yellow-400",
  processing: "text-blue-400 bg-blue-400",
  shipped: "text-orange-400 bg-orange-400",
  delivered: "text-green-400 bg-green-400",
}

export default function TrackingPage() {
  const params = useParams()
  const trackingId = params.trackingId as string
  const { getOrderById } = useOrder()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (trackingId) {
      const foundOrder = getOrderById(trackingId)
      setOrder(foundOrder)
    }
  }, [trackingId, getOrderById])

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8">Order not found</h1>
          <p className="text-gray-400 mb-8">The tracking ID you entered doesn't exist or has expired.</p>
          <Link href="/orders" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block">
            View All Orders
          </Link>
        </div>
      </div>
    )
  }

  const currentStepIndex = trackingSteps.findIndex((step) => step.status === order.status)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link href="/orders" className="text-gray-400 hover:text-white mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-4xl font-bold text-red-600">Track Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Tracking */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Order #{order.id}</h2>
              <p className="text-gray-400 mb-6">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* Tracking Steps */}
              <div className="relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-700"></div>
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => {
                    const StepIcon = step.icon
                    const isCompleted = index <= currentStepIndex
                    const isCurrent = index === currentStepIndex

                    return (
                      <div key={step.status} className="relative flex items-center">
                        <div
                          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                            isCompleted
                              ? `${statusColors[step.status as keyof typeof statusColors].split(" ")[1]} border-transparent text-black`
                              : "border-gray-600 bg-gray-800 text-gray-400"
                          }`}
                        >
                          <StepIcon className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <h3
                            className={`font-semibold ${
                              isCurrent
                                ? statusColors[step.status as keyof typeof statusColors].split(" ")[0]
                                : isCompleted
                                  ? "text-white"
                                  : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </h3>
                          {isCurrent && (
                            <p className="text-gray-400 text-sm mt-1">
                              {step.status === "pending" &&
                                "We have received your order and are preparing it for processing."}
                              {step.status === "processing" && "Your order is being prepared and will be shipped soon."}
                              {step.status === "shipped" && "Your order has been shipped and is on its way to you."}
                              {step.status === "delivered" && "Your order has been delivered successfully."}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <div className="text-gray-400">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Estimated Delivery</h4>
                  <p className="text-gray-400">
                    {order.status === "delivered"
                      ? "Delivered"
                      : `${Math.floor(Math.random() * 5) + 3}-${Math.floor(Math.random() * 3) + 7} business days`}
                  </p>

                  <h4 className="font-semibold mb-2 mt-4">Tracking Number</h4>
                  <p className="text-gray-400 font-mono">
                    {order.status !== "pending" ? `TRK${order.id.slice(-8).toUpperCase()}` : "Not available yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-6 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-red-400">${order.total.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Payment Method: {order.paymentMethod}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/orders"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors block text-center"
              >
                View All Orders
              </Link>
              <Link
                href="/shop"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
