import type React from "react"
import type { Metadata } from "next"
import { Inter, Creepster } from "next/font/google"
import "./globals.css"
import { CartProvider } from "../contexts/cart-context"
import { WishlistProvider } from "../contexts/wishlist-context"
import { OrderProvider } from "../contexts/order-context"
import { AuthProvider } from "../contexts/auth-context"
import { AnalyticsProvider } from "../contexts/analytics-context"
import { ProductProvider } from "../contexts/product-context"
import { ReviewProvider } from "../contexts/review-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })
const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
})

export const metadata: Metadata = {
  title: "Sinister Shop - Horror Merchandise",
  description: "Your one-stop shop for horror merchandise and collectibles",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${creepster.variable}`}>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <ProductProvider>
              <ReviewProvider>
                <AnalyticsProvider>
                  <OrderProvider>
                    <WishlistProvider>
                      <CartProvider>{children}</CartProvider>
                    </WishlistProvider>
                  </OrderProvider>
                </AnalyticsProvider>
              </ReviewProvider>
            </ProductProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
