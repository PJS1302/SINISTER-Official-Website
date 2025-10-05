"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import { Upload, LinkIcon, X, Heart, MessageCircle } from "lucide-react"

interface GalleryItem {
  id: string
  url: string
  title: string
  author: string
  likes: number
  comments: string[]
  createdAt: Date
}

export default function FanGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")
  const [imageUrl, setImageUrl] = useState("")
  const [imageTitle, setImageTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Load gallery items from localStorage on mount
  useEffect(() => {
    const savedGallery = localStorage.getItem("sinister-gallery")
    if (savedGallery) {
      try {
        const items = JSON.parse(savedGallery).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }))
        setGalleryItems(items)
      } catch (error) {
        console.error("[v0] Error loading gallery from localStorage:", error)
      }
    } else {
      // Add some sample items
      const sampleItems: GalleryItem[] = [
        {
          id: "1",
          url: "/horror-movie-poster.png",
          title: "Sinister Fan Art",
          author: "HorrorFan123",
          likes: 24,
          comments: ["Amazing work!", "Love the dark atmosphere"],
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          id: "2",
          url: "/dark-horror-art-print.jpg",
          title: "Nightmare Landscape",
          author: "DarkArtist",
          likes: 18,
          comments: ["So creepy!", "This gave me chills"],
          createdAt: new Date(Date.now() - 172800000),
        },
        {
          id: "3",
          url: "/creepy-horror-mask.jpg",
          title: "Custom Horror Mask",
          author: "MaskMaker",
          likes: 31,
          comments: ["Incredible detail!", "Where can I buy this?"],
          createdAt: new Date(Date.now() - 259200000),
        },
      ]
      setGalleryItems(sampleItems)
    }
  }, [])

  // Save gallery items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sinister-gallery", JSON.stringify(galleryItems))
  }, [galleryItems])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageTitle || !authorName) {
      alert("Please fill in all required fields")
      return
    }

    let finalImageUrl = ""

    if (uploadMethod === "url") {
      if (!imageUrl) {
        alert("Please enter an image URL")
        return
      }
      finalImageUrl = imageUrl
    } else {
      if (!selectedFile) {
        alert("Please select a file")
        return
      }
      // In a real app, you would upload the file to a server
      // For demo purposes, we'll use a placeholder
      finalImageUrl = URL.createObjectURL(selectedFile)
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      url: finalImageUrl,
      title: imageTitle,
      author: authorName,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    }

    setGalleryItems((prev) => [newItem, ...prev])

    // Reset form
    setImageUrl("")
    setImageTitle("")
    setAuthorName("")
    setSelectedFile(null)
    setShowUploadModal(false)

    console.log("[v0] New gallery item added:", newItem)
  }

  const handleLike = (id: string) => {
    setGalleryItems((prev) => prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-600 mb-2">Fan Gallery</h1>
            <p className="text-gray-400">Share your horror-inspired art and creations</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Art
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
              <div className="aspect-square relative">
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=300"
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">by {item.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{item.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{item.comments.length}</span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">{item.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-16">
            <Upload className="h-24 w-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">No artwork yet</h2>
            <p className="text-gray-400 mb-8">Be the first to share your horror-inspired creations</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block transition-colors"
            >
              Upload Your Art
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowUploadModal(false)} />
          <div className="absolute inset-4 bg-gray-900 rounded-lg shadow-xl max-w-md mx-auto my-auto">
            <div className="flex h-full flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-700 p-6">
                <h2 className="text-2xl font-semibold text-white">Upload Artwork</h2>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Upload Method */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Upload Method</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setUploadMethod("url")}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                          uploadMethod === "url"
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-600 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        <LinkIcon className="h-4 w-4 mx-auto mb-1" />
                        URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMethod("file")}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                          uploadMethod === "file"
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-600 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        <Upload className="h-4 w-4 mx-auto mb-1" />
                        File
                      </button>
                    </div>
                  </div>

                  {/* Image Input */}
                  {uploadMethod === "url" ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL *</label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-2">Select File *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:cursor-pointer"
                        required
                      />
                    </div>
                  )}

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="My Horror Artwork"
                      required
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Artist Name"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Upload Artwork
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
