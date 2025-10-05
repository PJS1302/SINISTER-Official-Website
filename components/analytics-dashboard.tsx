"use client"

import { useAnalytics } from "../contexts/analytics-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { useState, useEffect } from "react"

const COLORS = ["#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"]

export default function AnalyticsDashboard() {
  const { analytics, getRealTimeVisitors, getConversionRate, getAverageOrderValue } = useAnalytics()
  const [realTimeVisitors, setRealTimeVisitors] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeVisitors(getRealTimeVisitors())
    }, 1000)

    return () => clearInterval(interval)
  }, [getRealTimeVisitors])

  const conversionRate = getConversionRate().toFixed(1)
  const avgOrderValue = getAverageOrderValue().toFixed(2)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-creepster text-red-600">SINISTER ANALYTICS</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">{realTimeVisitors} online now</span>
          </div>
          <Badge variant="destructive" className="text-sm">
            Live Data
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Visitors</CardTitle>
            <div className="h-4 w-4 text-red-600">👁️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.visitors.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Souls who dared to enter</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Buyers</CardTitle>
            <div className="h-4 w-4 text-red-600">💀</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.buyers.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Victims who purchased</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
            <div className="h-4 w-4 text-red-600">⚡</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{conversionRate}%</div>
            <p className="text-xs text-gray-400">Fear conversion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <div className="h-4 w-4 text-red-600">🩸</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${analytics.revenue.toLocaleString()}</div>
            <p className="text-xs text-gray-400">Blood money earned</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Order Value</CardTitle>
            <div className="h-4 w-4 text-red-600">💰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${avgOrderValue}</div>
            <p className="text-xs text-gray-400">Per sinister purchase</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Bounce Rate</CardTitle>
            <div className="h-4 w-4 text-red-600">🚪</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.bounceRate}%</div>
            <p className="text-xs text-gray-400">Escaped the horror</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-red-600">
            Products
          </TabsTrigger>
          <TabsTrigger value="audience" className="data-[state=active]:bg-red-600">
            Audience
          </TabsTrigger>
          <TabsTrigger value="collections" className="data-[state=active]:bg-red-600">
            Collections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Daily Visitors & Revenue</CardTitle>
                <CardDescription className="text-gray-400">Track the souls entering your domain</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.dailyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #DC2626",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stackId="1"
                      stroke="#DC2626"
                      fill="#DC2626"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="buyers"
                      stackId="2"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Hourly Traffic Pattern</CardTitle>
                <CardDescription className="text-gray-400">When the darkness is most active</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.hourlyTraffic}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #DC2626",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#DC2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="buyers" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Top Sinister Products</CardTitle>
                <CardDescription className="text-gray-400">Most popular items of terror</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.topProducts.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #DC2626",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="sales" fill="#DC2626" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Product Performance</CardTitle>
                <CardDescription className="text-gray-400">Views vs Sales conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm">{product.name}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-400">{product.views} views</span>
                          <span className="text-xs text-gray-400">{product.sales} sales</span>
                        </div>
                        <Progress value={product.conversionRate} className="mt-2 h-2" />
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm font-bold text-green-400">{product.conversionRate.toFixed(1)}%</p>
                        <p className="text-xs text-gray-400">conversion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Top Countries</CardTitle>
                <CardDescription className="text-gray-400">Where the darkness spreads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <span className="text-sm text-white">{country.country}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={country.percentage} className="w-20 h-2" />
                        <span className="text-xs text-gray-400 w-12">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Device Types</CardTitle>
                <CardDescription className="text-gray-400">How they access the horror</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={analytics.deviceTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="visitors"
                    >
                      {analytics.deviceTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {analytics.deviceTypes.map((device, index) => (
                    <div key={device.device} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-white">{device.device}</span>
                      </div>
                      <span className="text-gray-400">{device.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Traffic Sources</CardTitle>
                <CardDescription className="text-gray-400">How they find the darkness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <span className="text-sm text-white">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={source.percentage} className="w-20 h-2" />
                        <span className="text-xs text-gray-400 w-12">{source.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <Card className="bg-gray-900 border-red-600">
            <CardHeader>
              <CardTitle className="text-red-600">Collection Performance</CardTitle>
              <CardDescription className="text-gray-400">How each sinister collection performs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.collectionPerformance.map((collection, index) => (
                  <div key={collection.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white">{collection.name}</h3>
                      <Badge variant={index < 2 ? "destructive" : "secondary"}>
                        {collection.conversionRate.toFixed(1)}% conversion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Views</p>
                        <p className="text-white font-medium">{collection.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Sales</p>
                        <p className="text-white font-medium">{collection.sales.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Revenue</p>
                        <p className="text-green-400 font-medium">${collection.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={collection.conversionRate} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
