"use client"

import { CheckCircle, IndianRupee, Search as SearchIcon } from "lucide-react"
import ProviderCard from "./ProviderCard"
import Image from "next/image"

export default function SearchSection() {
  return (
    <section className="w-full bg-[#EFF3F4] py-8 md:py-[64px] px-4 md:px-[76px]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-10 max-w-[1280px] mx-auto">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-[671px] space-y-6 lg:space-y-8">

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-[36px] md:leading-[40px] font-bold tracking-[-0.02em] text-[#1B2228]">
              Find the best healthcare option near you
            </h2>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[14px] sm:text-[15px] text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/rupee-waves.svg"
                  alt="rupee"
                  width={20}
                  height={20}
                />
                Transparent prices
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/hugeicons_id-verified.svg"
                  alt="verified"
                  width={20}
                  height={20}
                />
                Verified providers
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/uil_calender.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                Quick booking
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <input
              type="text"
              placeholder="Search specialty / doctors / hospitals / tests"
              className="w-full h-[50px] rounded-lg border border-[#D3D8DB] px-4 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#39A4EC] focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Location (City/Pincode)"
              className="w-full h-[50px] rounded-lg border border-[#D3D8DB] px-4 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#39A4EC] focus:border-transparent"
            />

            <button className="w-full h-[48px] rounded-lg bg-[#39A4EC] border border-[rgba(25,97,255,0.4)] text-white flex items-center justify-center gap-2 font-medium hover:bg-[#2c8fd1] transition-colors duration-200">
              <SearchIcon size={18} />
              Search
            </button>

            <div className="flex items-center gap-2 text-[14px] text-[#16A34A]">
              <CheckCircle size={16} />
              Only admin-approved providers shown
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[506px] space-y-4 mt-6 lg:mt-0">
          
          {/* First stacked card */}
          <ProviderCard
            stacked
            name="Dr. Raghav Sharma"
            type="General Physician"
            price="₹500"
            distance="2.3 km"
            rating="4.8"
            reviews="234"
            availability="Available Today"
            tags={["Consultation", "Diagnostics"]}
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/66e32140fd18fec26d5f5caa007c7f13b9ba26f4.png"
          />

          <ProviderCard
            name="City Care Hospital"
            type="Multi-specialty Hospital"
            price="₹1200"
            distance="3.1 km"
            rating="4.6"
            reviews="567"
            availability="Open 24/7"
            tags={["Emergency", "Surgery", "ICU"]}
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/542febb65648091ef7d4b3b0bed4ea3ecb83bc97.png"
          />

          <ProviderCard
            name="Apollo Pharmacy"
            type="Medical Store"
            price="₹5"
            distance="1.1 km"
            rating="4.7"
            reviews="531"
            availability="Available Today"
            tags={["Medicine", "Home Delivery"]}
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/e2398ce4bef102442d54ec57f5a099877ecaf3ac.png"
          />

        </div>

      </div>
    </section>
  )
}