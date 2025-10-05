"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
}

interface ReviewContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
  getProductReviews: (productId: string) => Review[]
  getAverageRating: (productId: string) => number
  getReviewCount: (productId: string) => number
  markHelpful: (reviewId: string) => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("sinister-reviews")
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      // Initialize with some demo reviews
      const demoReviews: Review[] = [
        {
          id: "1",
          productId: "st-001",
          userId: "user1",
          userName: "DarkSoul666",
          rating: 5,
          title: "Absolutely SINISTER!",
          comment:
            "This t-shirt is incredible! The glow-in-the-dark skull effect is terrifying and the quality is top-notch. Perfect for horror fans!",
          date: "2024-01-15",
          verified: true,
          helpful: 12,
        },
        {
          id: "2",
          productId: "st-001",
          userId: "user2",
          userName: "HorrorFan2024",
          rating: 4,
          title: "Great design, good quality",
          comment:
            "Love the SINISTER branding and the skull design. Material is comfortable and the print quality is excellent.",
          date: "2024-01-10",
          verified: true,
          helpful: 8,
        },
        {
          id: "3",
          productId: "st-002",
          userId: "user3",
          userName: "CreepyCollector",
          rating: 5,
          title: "Lightning Eyes are AMAZING!",
          comment:
            "The red glowing eyes effect is absolutely terrifying! The green lightning design complements the SINISTER brand perfectly. High quality material.",
          date: "2024-01-12",
          verified: true,
          helpful: 15,
        },
        {
          id: "4",
          productId: "st-003",
          userId: "user4",
          userName: "GothicStyle",
          rating: 4,
          title: "Perfect Gothic Metal Look",
          comment:
            "The white gothic lettering on black looks incredible. Very metal and sinister. Great for concerts and dark events.",
          date: "2024-01-08",
          verified: true,
          helpful: 10,
        },
        {
          id: "5",
          productId: "st-004",
          userId: "user5",
          userName: "ReaperFan",
          rating: 5,
          title: "Death's Messenger Indeed!",
          comment:
            "This skull reaper design is absolutely haunting. The detail is incredible and the SINISTER branding fits perfectly with the death theme.",
          date: "2024-01-05",
          verified: true,
          helpful: 18,
        },
        {
          id: "6",
          productId: "st-005",
          userId: "user6",
          userName: "HorrorMovieBuff",
          rating: 5,
          title: "Horror Movie Perfection",
          comment:
            "As a horror movie fan, this t-shirt is exactly what I wanted. The red eyes are so creepy and the design quality is outstanding!",
          date: "2024-01-03",
          verified: true,
          helpful: 22,
        },
        {
          id: "7",
          productId: "sw-001",
          userId: "user7",
          userName: "TimeKeeper",
          rating: 5,
          title: "Sinister Time Tracking",
          comment:
            "This watch is absolutely incredible! The dark design with red accents is perfect. Keeps perfect time and looks menacing on my wrist.",
          date: "2024-01-14",
          verified: true,
          helpful: 14,
        },
        {
          id: "8",
          productId: "sw-002",
          userId: "user8",
          userName: "DarkWatcher",
          rating: 4,
          title: "Great Quality Timepiece",
          comment:
            "Love the gothic design and the SINISTER branding. The watch face is easy to read even in low light. Very satisfied with the purchase.",
          date: "2024-01-11",
          verified: true,
          helpful: 9,
        },
        {
          id: "9",
          productId: "sa-001",
          userId: "user9",
          userName: "AccessoryLover",
          rating: 5,
          title: "Perfect SINISTER Accessory",
          comment:
            "This accessory completes my dark look perfectly. The quality is excellent and the SINISTER branding is subtle but effective.",
          date: "2024-01-09",
          verified: true,
          helpful: 11,
        },
        {
          id: "10",
          productId: "sa-002",
          userId: "user10",
          userName: "DarkStyle",
          rating: 4,
          title: "Great Addition to Collection",
          comment:
            "Another great piece from SINISTER. The design is unique and the quality matches the price. Highly recommend for dark fashion enthusiasts.",
          date: "2024-01-07",
          verified: false,
          helpful: 7,
        },
        {
          id: "11",
          productId: "sh-001",
          userId: "user11",
          userName: "HoodieCollector",
          rating: 5,
          title: "Warmth with a Dark Twist",
          comment:
            "This hoodie is incredibly comfortable and warm. The SINISTER embroidery is high quality and the fit is perfect. Love wearing it!",
          date: "2024-01-06",
          verified: true,
          helpful: 16,
        },
        {
          id: "12",
          productId: "sh-002",
          userId: "user12",
          userName: "ComfortSeeker",
          rating: 4,
          title: "Cozy and Sinister",
          comment:
            "Great hoodie for cold days. The material is soft and the design is perfectly dark. SINISTER quality as always.",
          date: "2024-01-04",
          verified: true,
          helpful: 8,
        },
        {
          id: "13",
          productId: "st-006",
          userId: "user13",
          userName: "BloodMoonFan",
          rating: 5,
          title: "Blood Moon Perfection",
          comment:
            "The blood moon design is absolutely stunning! The atmospheric effect with the SINISTER logo creates the perfect dark aesthetic.",
          date: "2024-01-13",
          verified: true,
          helpful: 19,
        },
        {
          id: "14",
          productId: "st-007",
          userId: "user14",
          userName: "VampireLover",
          rating: 5,
          title: "Bloodthirsty Design!",
          comment:
            "The vampire fangs dripping blood design is incredible! Perfect for vampire enthusiasts and the SINISTER branding completes the look.",
          date: "2024-01-02",
          verified: true,
          helpful: 21,
        },
        {
          id: "15",
          productId: "st-008",
          userId: "user15",
          userName: "ForestWalker",
          rating: 4,
          title: "Haunted Forest Vibes",
          comment:
            "The spooky haunted forest scene is beautifully designed. Creates an eerie atmosphere that perfectly matches the SINISTER brand.",
          date: "2024-01-01",
          verified: true,
          helpful: 13,
        },
        {
          id: "16",
          productId: "st-009",
          userId: "user16",
          userName: "DemonWings",
          rating: 5,
          title: "Spread Your Dark Wings",
          comment:
            "The demon wings design is absolutely powerful! Makes me feel like I can conquer the darkness. SINISTER quality is unmatched.",
          date: "2023-12-30",
          verified: true,
          helpful: 17,
        },
        {
          id: "17",
          productId: "st-010",
          userId: "user17",
          userName: "GraveyardKeeper",
          rating: 4,
          title: "Eerie Graveyard Scene",
          comment:
            "The cemetery design with tombstones is perfectly creepy. Great attention to detail and the SINISTER branding fits the theme perfectly.",
          date: "2023-12-28",
          verified: true,
          helpful: 12,
        },
        {
          id: "18",
          productId: "sw-003",
          userId: "user18",
          userName: "GothicTimer",
          rating: 5,
          title: "Gothic Timepiece Excellence",
          comment:
            "This watch is a masterpiece! The gothic elements combined with modern functionality make it perfect for any dark fashion enthusiast.",
          date: "2023-12-27",
          verified: true,
          helpful: 15,
        },
        {
          id: "19",
          productId: "sa-003",
          userId: "user19",
          userName: "DarkAccessories",
          rating: 4,
          title: "Completes the Dark Look",
          comment:
            "Perfect accessory to complete my SINISTER collection. The quality is excellent and the design is subtle yet impactful.",
          date: "2023-12-26",
          verified: false,
          helpful: 9,
        },
        {
          id: "20",
          productId: "sh-003",
          userId: "user20",
          userName: "WinterDarkness",
          rating: 5,
          title: "Perfect Winter Companion",
          comment:
            "This hoodie keeps me warm while maintaining that perfect dark aesthetic. The SINISTER quality is evident in every stitch.",
          date: "2023-12-25",
          verified: true,
          helpful: 20,
        },
      ]
      setReviews(demoReviews)
      localStorage.setItem("sinister-reviews", JSON.stringify(demoReviews))
    }
  }, [])

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sinister-reviews", JSON.stringify(reviews))
  }, [reviews])

  const addReview = (reviewData: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }
    setReviews((prev) => [newReview, ...prev])
  }

  const getProductReviews = (productId: string): Review[] => {
    return reviews
      .filter((review) => review.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getAverageRating = (productId: string): number => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
    return Math.round((totalRating / productReviews.length) * 10) / 10
  }

  const getReviewCount = (productId: string): number => {
    return getProductReviews(productId).length
  }

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        getReviewCount,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
