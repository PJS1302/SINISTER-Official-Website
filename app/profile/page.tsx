"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/auth-context"
import Header from "../../components/header"
import { User, MapPin, Phone, Mail, Edit3, Save, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"

interface UserProfile {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  bio: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || "SINISTER User",
    email: user?.email || "user@sinister.com",
    phone: "+1 (555) 666-EVIL",
    address: {
      street: "666 Nightmare Lane",
      city: "Salem",
      state: "Massachusetts",
      zipCode: "01970",
      country: "United States",
    },
    bio: "A devoted follower of the SINISTER brand, embracing the darkness and collecting nightmares.",
  })

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  const handleEdit = () => {
    setEditedProfile(profile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // Here you would typically save to a backend
    console.log("Profile saved:", editedProfile)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditedProfile((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserProfile] as any),
          [child]: value,
        },
      }))
    } else {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-creepster text-red-600">SINISTER PROFILE</h1>
          </div>
          <p className="text-gray-400 text-lg">Manage your dark identity</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-8 border-2 border-red-900 shadow-2xl relative overflow-hidden">
            {/* Blood splatter decorations */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

            {/* Header with edit button */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-400">{profile.name}</h2>
                  <p className="text-gray-400">{profile.email}</p>
                </div>
              </div>

              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-gray-600 bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Personal Information</h3>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-800 border-red-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800 border-red-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                      <Mail className="h-4 w-4 text-red-400" />
                      {profile.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Phone Number</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-800 border-red-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                      <Phone className="h-4 w-4 text-red-400" />
                      {profile.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Bio</label>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="bg-gray-800 border-red-600 text-white min-h-[100px]"
                      placeholder="Tell us about your SINISTER journey..."
                    />
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.bio}</p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </h3>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Street Address</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      className="bg-gray-800 border-red-600 text-white"
                    />
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.address.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">City</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.address.city}
                        onChange={(e) => handleInputChange("address.city", e.target.value)}
                        className="bg-gray-800 border-red-600 text-white"
                      />
                    ) : (
                      <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.address.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">State</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.address.state}
                        onChange={(e) => handleInputChange("address.state", e.target.value)}
                        className="bg-gray-800 border-red-600 text-white"
                      />
                    ) : (
                      <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.address.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">ZIP Code</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.address.zipCode}
                        onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                        className="bg-gray-800 border-red-600 text-white"
                      />
                    ) : (
                      <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.address.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Country</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.address.country}
                        onChange={(e) => handleInputChange("address.country", e.target.value)}
                        className="bg-gray-800 border-red-600 text-white"
                      />
                    ) : (
                      <p className="text-white bg-gray-800 p-3 rounded-lg">{profile.address.country}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order History Preview */}
            <div className="mt-8 pt-8 border-t border-gray-700 relative z-10">
              <h3 className="text-xl font-semibold text-red-400 mb-4">Recent SINISTER Orders</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-red-600">
                  <p className="text-sm text-gray-400">Order #SIN-001</p>
                  <p className="text-white font-semibold">SINISTER Demonic Lion T-Shirt</p>
                  <p className="text-green-400">₹899</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-red-600">
                  <p className="text-sm text-gray-400">Order #SIN-002</p>
                  <p className="text-white font-semibold">SINISTER Blood Red Watch</p>
                  <p className="text-green-400">₹2999</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-red-600">
                  <p className="text-sm text-gray-400">Order #SIN-003</p>
                  <p className="text-white font-semibold">SINISTER Horror Backpack</p>
                  <p className="text-green-400">₹1999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
