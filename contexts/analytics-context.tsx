"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AnalyticsData {
  visitors: number
  buyers: number
  totalOrders: number
  revenue: number
  uniqueVisitors: number
  returningVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topCountries: Array<{
    country: string
    visitors: number
    percentage: number
  }>
  deviceTypes: Array<{
    device: string
    visitors: number
    percentage: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
    views: number
    conversionRate: number
  }>
  dailyVisitors: Array<{
    date: string
    visitors: number
    buyers: number
    revenue: number
    orders: number
  }>
  hourlyTraffic: Array<{
    hour: string
    visitors: number
    buyers: number
  }>
  collectionPerformance: Array<{
    id: string
    name: string
    views: number
    sales: number
    revenue: number
    conversionRate: number
  }>
}

interface AnalyticsContextType {
  analytics: AnalyticsData
  incrementVisitors: () => void
  incrementBuyers: () => void
  addOrder: (amount: number, productId: string, productName: string) => void
  trackProductView: (productId: string, productName: string) => void
  trackCollectionView: (collectionId: string, collectionName: string) => void
  getAnalytics: () => AnalyticsData
  getRealTimeVisitors: () => number
  getConversionRate: () => number
  getAverageOrderValue: () => number
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 0,
    buyers: 0,
    totalOrders: 0,
    revenue: 0,
    uniqueVisitors: 0,
    returningVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topCountries: [],
    deviceTypes: [],
    trafficSources: [],
    topProducts: [],
    dailyVisitors: [],
    hourlyTraffic: [],
    collectionPerformance: [],
  })

  const [realTimeVisitors, setRealTimeVisitors] = useState(0)

  // Load analytics from localStorage on mount
  useEffect(() => {
    const savedAnalytics = localStorage.getItem("sinister-analytics")
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics))
    } else {
      const initialData: AnalyticsData = {
        visitors: 15247,
        buyers: 1289,
        totalOrders: 2156,
        revenue: 124500,
        uniqueVisitors: 12847,
        returningVisitors: 2400,
        bounceRate: 35.2,
        avgSessionDuration: 4.5,
        topCountries: [
          { country: "United States", visitors: 5847, percentage: 38.3 },
          { country: "United Kingdom", visitors: 2134, percentage: 14.0 },
          { country: "Canada", visitors: 1876, percentage: 12.3 },
          { country: "Australia", visitors: 1234, percentage: 8.1 },
          { country: "Germany", visitors: 987, percentage: 6.5 },
        ],
        deviceTypes: [
          { device: "Desktop", visitors: 8234, percentage: 54.0 },
          { device: "Mobile", visitors: 5678, percentage: 37.2 },
          { device: "Tablet", visitors: 1335, percentage: 8.8 },
        ],
        trafficSources: [
          { source: "Direct", visitors: 6123, percentage: 40.2 },
          { source: "Social Media", visitors: 4567, percentage: 29.9 },
          { source: "Search Engine", visitors: 3234, percentage: 21.2 },
          { source: "Referral", visitors: 1323, percentage: 8.7 },
        ],
        topProducts: [
          {
            id: "st-001",
            name: "SINISTER Demonic Lion T-Shirt",
            sales: 245,
            revenue: 6125,
            views: 1234,
            conversionRate: 19.9,
          },
          {
            id: "sw-001",
            name: "SINISTER Blood Red Watch",
            sales: 132,
            revenue: 11868,
            views: 876,
            conversionRate: 15.1,
          },
          {
            id: "sa-001",
            name: "SINISTER Horror Backpack",
            sales: 128,
            revenue: 7680,
            views: 945,
            conversionRate: 13.5,
          },
          {
            id: "st-002",
            name: "SINISTER Lightning Eyes T-Shirt",
            sales: 125,
            revenue: 3125,
            views: 823,
            conversionRate: 15.2,
          },
          {
            id: "sh-001",
            name: "SINISTER Classic Black Hoodie",
            sales: 98,
            revenue: 4900,
            views: 678,
            conversionRate: 14.5,
          },
        ],
        dailyVisitors: [
          { date: "2024-01-01", visitors: 1245, buyers: 89, revenue: 4567, orders: 123 },
          { date: "2024-01-02", visitors: 1367, buyers: 95, revenue: 5234, orders: 134 },
          { date: "2024-01-03", visitors: 1489, buyers: 102, revenue: 5891, orders: 145 },
          { date: "2024-01-04", visitors: 1623, buyers: 118, revenue: 6234, orders: 167 },
          { date: "2024-01-05", visitors: 1756, buyers: 125, revenue: 6789, orders: 178 },
          { date: "2024-01-06", visitors: 1634, buyers: 112, revenue: 5987, orders: 156 },
          { date: "2024-01-07", visitors: 1878, buyers: 135, revenue: 7234, orders: 189 },
        ],
        hourlyTraffic: [
          { hour: "00:00", visitors: 45, buyers: 2 },
          { hour: "01:00", visitors: 32, buyers: 1 },
          { hour: "02:00", visitors: 28, buyers: 1 },
          { hour: "03:00", visitors: 23, buyers: 0 },
          { hour: "04:00", visitors: 19, buyers: 0 },
          { hour: "05:00", visitors: 25, buyers: 1 },
          { hour: "06:00", visitors: 34, buyers: 2 },
          { hour: "07:00", visitors: 56, buyers: 3 },
          { hour: "08:00", visitors: 78, buyers: 5 },
          { hour: "09:00", visitors: 89, buyers: 6 },
          { hour: "10:00", visitors: 123, buyers: 8 },
          { hour: "11:00", visitors: 145, buyers: 12 },
          { hour: "12:00", visitors: 167, buyers: 15 },
          { hour: "13:00", visitors: 189, buyers: 18 },
          { hour: "14:00", visitors: 201, buyers: 20 },
          { hour: "15:00", visitors: 234, buyers: 22 },
          { hour: "16:00", visitors: 256, buyers: 25 },
          { hour: "17:00", visitors: 278, buyers: 28 },
          { hour: "18:00", visitors: 298, buyers: 32 },
          { hour: "19:00", visitors: 312, buyers: 35 },
          { hour: "20:00", visitors: 289, buyers: 30 },
          { hour: "21:00", visitors: 267, buyers: 28 },
          { hour: "22:00", visitors: 234, buyers: 24 },
          { hour: "23:00", visitors: 123, buyers: 12 },
        ],
        collectionPerformance: [
          {
            id: "sinister-tshirts",
            name: "SINISTER T-SHIRTS",
            views: 5234,
            sales: 567,
            revenue: 14175,
            conversionRate: 10.8,
          },
          {
            id: "sinister-watches",
            name: "SINISTER WATCHES",
            views: 3456,
            sales: 234,
            revenue: 21060,
            conversionRate: 6.8,
          },
          {
            id: "sinister-accessories",
            name: "SINISTER ACCESSORIES",
            views: 4123,
            sales: 345,
            revenue: 13800,
            conversionRate: 8.4,
          },
          {
            id: "sinister-hoodies",
            name: "SINISTER HOODIES",
            views: 2987,
            sales: 198,
            revenue: 9900,
            conversionRate: 6.6,
          },
          {
            id: "sinister-collectibles",
            name: "SINISTER COLLECTIBLES",
            views: 1876,
            sales: 89,
            revenue: 8900,
            conversionRate: 4.7,
          },
        ],
      }
      setAnalytics(initialData)
      localStorage.setItem("sinister-analytics", JSON.stringify(initialData))
    }

    const interval = setInterval(() => {
      setRealTimeVisitors(Math.floor(Math.random() * 50) + 10)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Save analytics to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sinister-analytics", JSON.stringify(analytics))
  }, [analytics])

  const incrementVisitors = () => {
    setAnalytics((prev) => ({
      ...prev,
      visitors: prev.visitors + 1,
      uniqueVisitors: prev.uniqueVisitors + 1,
    }))
  }

  const incrementBuyers = () => {
    setAnalytics((prev) => ({
      ...prev,
      buyers: prev.buyers + 1,
    }))
  }

  const addOrder = (amount: number, productId: string, productName: string) => {
    setAnalytics((prev) => {
      const updatedTopProducts = [...prev.topProducts]
      const existingProduct = updatedTopProducts.find((p) => p.id === productId)

      if (existingProduct) {
        existingProduct.sales += 1
        existingProduct.revenue += amount
        existingProduct.conversionRate = (existingProduct.sales / existingProduct.views) * 100
      } else {
        updatedTopProducts.push({
          id: productId,
          name: productName,
          sales: 1,
          revenue: amount,
          views: 1,
          conversionRate: 100,
        })
      }

      // Sort by sales and keep top 10
      updatedTopProducts.sort((a, b) => b.sales - a.sales)
      updatedTopProducts.splice(10)

      return {
        ...prev,
        totalOrders: prev.totalOrders + 1,
        revenue: prev.revenue + amount,
        topProducts: updatedTopProducts,
      }
    })
  }

  const trackProductView = (productId: string, productName: string) => {
    setAnalytics((prev) => {
      const updatedTopProducts = [...prev.topProducts]
      const existingProduct = updatedTopProducts.find((p) => p.id === productId)

      if (existingProduct) {
        existingProduct.views += 1
        existingProduct.conversionRate = (existingProduct.sales / existingProduct.views) * 100
      } else {
        updatedTopProducts.push({
          id: productId,
          name: productName,
          sales: 0,
          revenue: 0,
          views: 1,
          conversionRate: 0,
        })
      }

      return {
        ...prev,
        topProducts: updatedTopProducts,
      }
    })
  }

  const trackCollectionView = (collectionId: string, collectionName: string) => {
    setAnalytics((prev) => {
      const updatedCollections = [...prev.collectionPerformance]
      const existingCollection = updatedCollections.find((c) => c.id === collectionId)

      if (existingCollection) {
        existingCollection.views += 1
        existingCollection.conversionRate = (existingCollection.sales / existingCollection.views) * 100
      } else {
        updatedCollections.push({
          id: collectionId,
          name: collectionName,
          views: 1,
          sales: 0,
          revenue: 0,
          conversionRate: 0,
        })
      }

      return {
        ...prev,
        collectionPerformance: updatedCollections,
      }
    })
  }

  const getAnalytics = () => analytics

  const getRealTimeVisitors = () => realTimeVisitors
  const getConversionRate = () => (analytics.visitors > 0 ? (analytics.buyers / analytics.visitors) * 100 : 0)
  const getAverageOrderValue = () => (analytics.totalOrders > 0 ? analytics.revenue / analytics.totalOrders : 0)

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        incrementVisitors,
        incrementBuyers,
        addOrder,
        trackProductView,
        trackCollectionView,
        getAnalytics,
        getRealTimeVisitors,
        getConversionRate,
        getAverageOrderValue,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
