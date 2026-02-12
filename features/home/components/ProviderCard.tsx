"use client"

import Image from "next/image"
import { CheckCircle, MapPin, Star, Clock } from "lucide-react"

type CardProps = {
  name: string
  type: string
  price: string
  distance: string
  rating: string
  reviews: string
  availability: string
  stacked?: boolean
  tags: string[]   // 👈 NEW
  image: string
}

export default function ProviderCard({
  name,
  type,
  price,
  distance,
  rating,
  reviews,
  availability,
  stacked = false,
  tags,
  image
}: CardProps) {
  return (
    <div className="relative">

      {/* 🔥 STACK LAYERS */}
      {stacked && (
  <>
    {/* Layer 1 - deepest */}
    <div className="absolute -top-6 -right-4 w-full h-full 
      rounded-[17px] bg-white border border-[#A4C2D4]
      shadow-[1px_3px_17px_rgba(81,104,145,0.08)]
      opacity-40"
    />

    {/* Layer 2 - middle */}
    <div className="absolute -top-3 -right-2 w-full h-full 
      rounded-[17px] bg-white border border-[#A4C2D4]
      shadow-[1px_3px_17px_rgba(81,104,145,0.08)]
      opacity-70"
    />
  </>
)}
      {/* MAIN CARD */}
      <div className="relative z-10 flex gap-4 p-4 rounded-[17px] 
        bg-white border border-[#A4C2D4] 
        shadow-[1px_3px_17px_rgba(81,104,145,0.08)]">

        <div className="w-[146px] h-[180px] bg-gray-200 rounded-xl relative overflow-hidden">
          <Image
  src={image}
  alt={name}
  fill
  unoptimized
  className="object-cover"
/>
        </div>

        <div className="flex-1 space-y-3">

          <div className="space-y-1">
            <h3 className="text-[16px] font-semibold text-[#0D2233]">
              {name}
            </h3>
            <p className="text-[14px] text-[#6B7280]">
              {type}
            </p>
          </div>

          <div className="flex gap-2">
  {tags.map((tag, index) => (
    <span
      key={index}
      className="px-3 py-[2px] rounded-full bg-[#DDE8FF] border border-[#A7BFF2] text-[13px]"
    >
      {tag}
    </span>
  ))}
</div>

          <div className="flex items-center gap-4 text-[13px] text-[#6B7280]">

            <div className="flex items-center gap-1 text-[#222E3A]">
              <Star size={14} />
              <span className="font-semibold">{rating}</span>
              <span>({reviews})</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {distance}
            </div>

            <div className="flex items-center gap-1 text-[#333] bg-[#E9FFF1] px-3 py-[2px] rounded-full border border-[#E9EDF0]">
              <Clock size={12} />
              {availability}
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-[24px] font-extrabold text-[#1961FF]">
              {price}
            </span>
            {/* <span className="text-[12px] text-[#6B7280]">
              Onwards
            </span> */}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1 
          text-[12px] text-[#0FA766] bg-[#E9FFF1] 
          border border-[#CFF3D8] px-3 py-[2px] rounded-full">
          <CheckCircle size={12} />
          Verified
        </div>
      </div>
    </div>
  )
}