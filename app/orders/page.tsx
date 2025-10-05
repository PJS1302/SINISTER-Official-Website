"use client"

import { useOrder } from "../../contexts/order-context"
import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, Calendar } from "lucide-react"

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
}

const statusColors = {
  pending: "text-yellow-400",
  processing: "text-blue-400",
  shipped: "text-orange-400",
  delivered: "text-green-400",
}

export default function OrdersPage() {
  const { state } = useOrder()

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Your Orders</h1>

        {state.orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
            <p className="text-gray-400 mb-8">Start shopping to see your orders here</p>
            <Link
              href="/shop"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {state.orders.map((order) => {
              const StatusIcon = statusIcons[order.status]
              const statusColor = statusColors[order.status]

              return (
                <div key={order.id} className="bg-gray-900 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
                      <p className="text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                      {order.deliveryDate && (
                        <p className="text-gray-400 flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Expected delivery: {order.deliveryDate}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className={`flex items-center space-x-2 ${statusColor}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="capitalize font-medium">{order.status}</span>
                      </div>
                      <Link
                        href={`/tracking/${order.id}`}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Track Order
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Items ({order.items.length})</h4>
                      <div className="space-y-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-gray-400 text-sm">+{order.items.length - 3} more items</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Shipping Address</h4>
                      <div className="text-gray-400">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        {order.shippingAddress.phone && (
                          <p className="mt-2">Phone: +91 {order.shippingAddress.phone}</p>
                        )}
                      </div>

                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        <p className="text-gray-400">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between items-center">
                    <div className="text-xl font-bold">
                      Total: <span className="text-red-400">₹{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={`/tracking/${order.id}`}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        View Details
                      </Link>
                      {order.status === "delivered" && (
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">Reorder</button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
