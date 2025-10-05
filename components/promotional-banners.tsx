"use client"

import { useProducts } from "../contexts/product-context"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"

export default function PromotionalBanners() {
  const { banners } = useProducts()
  const activeBanners = banners.filter((banner) => banner.isActive)

  return (
    <div className="space-y-6 mb-8">
      {activeBanners.map((banner) => (
        <Card key={banner.id} className="relative overflow-hidden bg-gray-900 border-red-600">
          <div className="relative h-64 md:h-80">
            <img src={banner.image || "/placeholder.svg"} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
              <h2 className="text-3xl md:text-5xl font-creepster text-red-600 mb-4">{banner.title}</h2>
              <p className="text-lg md:text-xl text-white mb-4 max-w-2xl">{banner.subtitle}</p>
              {banner.discount && (
                <Badge variant="destructive" className="text-lg px-6 py-2 bg-red-600 hover:bg-red-700 border-red-600">
                  {banner.discount}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
