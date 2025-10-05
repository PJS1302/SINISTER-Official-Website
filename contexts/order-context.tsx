"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  deliveryDate?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    zipCode: string
    country: string
    phone?: string
  }
  paymentMethod: string
}

interface OrderState {
  orders: Order[]
}

type OrderAction =
  | { type: "CREATE_ORDER"; payload: Omit<Order, "id" | "createdAt"> }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "LOAD_ORDERS"; payload: Order[] }

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  console.log("[v0] Order action:", action.type, action.payload)

  switch (action.type) {
    case "CREATE_ORDER": {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
      }
      return { ...state, orders: [newOrder, ...state.orders] }
    }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, status: action.payload.status } : order,
        ),
      }

    case "LOAD_ORDERS":
      return { ...state, orders: action.payload }

    default:
      return state
  }
}

interface OrderContextType {
  state: OrderState
  createOrder: (orderData: Omit<Order, "id" | "createdAt">) => string
  updateOrderStatus: (id: string, status: Order["status"]) => void
  getOrderById: (id: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
  })

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("sinister-orders")
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }))
        dispatch({ type: "LOAD_ORDERS", payload: orders })
      } catch (error) {
        console.error("[v0] Error loading orders from localStorage:", error)
      }
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sinister-orders", JSON.stringify(state.orders))
  }, [state.orders])

  const createOrder = (orderData: Omit<Order, "id" | "createdAt">) => {
    dispatch({ type: "CREATE_ORDER", payload: orderData })
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log("[v0] Order created:", orderId, orderData)
    return orderId
  }

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status } })
  }

  const getOrderById = (id: string) => {
    return state.orders.find((order) => order.id === id)
  }

  return (
    <OrderContext.Provider
      value={{
        state,
        createOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
