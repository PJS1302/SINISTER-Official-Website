"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useOrder } from "../../../contexts/order-context"
import Header from "../../../components/header"
import { CheckCircle, Package, Truck } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { getOrderById } = useOrder()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      setOrder(foundOrder)
      console.log("[v0] Order found:", foundOrder)
    }
  }, [orderId, getOrderById])

  if (!orderId || !order) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8">Order not found</h1>
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

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-green-500 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300">Thank you for your purchase</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <p className="text-gray-400">
                  Order ID: <span className="text-white">{order.id}</span>
                </p>
                <p className="text-gray-400">
                  Date: <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-400">
                  Status: <span className="text-green-400 capitalize">{order.status}</span>
                </p>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p className="text-gray-400">{order.shippingAddress.name}</p>
                <p className="text-gray-400">{order.shippingAddress.address}</p>
                <p className="text-gray-400">
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-400">{order.shippingAddress.country}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 mt-4 pt-4 text-right">
                <p className="text-xl font-bold">
                  Total: <span className="text-red-400">${order.total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Package className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="font-medium">Processing</p>
                <p className="text-gray-400 text-sm">We're preparing your order</p>
              </div>
              <div>
                <Truck className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="font-medium">Shipping</p>
                <p className="text-gray-400 text-sm">Your order will be shipped soon</p>
              </div>
              <div>
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-medium">Delivered</p>
                <p className="text-gray-400 text-sm">Enjoy your horror merchandise!</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">
              You will receive an email confirmation shortly. You can track your order status in your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/tracking/${order.id}`}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block transition-colors"
              >
                Track Order
              </Link>
              <Link
                href="/shop"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg inline-block transition-colors"
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
