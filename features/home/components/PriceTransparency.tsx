"use client";

import { Check, FileText, Stethoscope, CreditCard } from "lucide-react";

const features = [
  "All prices displayed upfront before booking",
  "Clear breakdown of all charges and fees",
  "No surprise bills or additional costs",
  "Provider prices are admin-verified",
];

const priceItems = [
  { icon: Stethoscope, label: "Consultation Fee", price: "₹500" },
  { icon: FileText, label: "Diagnostic Tests", price: "₹800" },
  { icon: CreditCard, label: "Platform Fee", price: "₹50" },
];

// 👉 PUBLIC FOLDER SE IMAGE KA PATH (root se start hoga)
const BACKGROUND_IMAGE_PATH = "/pattern.png";

export default function PriceTransparency() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">

      {/* Background Image from Public Folder */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                No hidden charges.<br />
                <span className="text-gray-900">Ever.</span>
              </h2>
              <p className="text-lg text-gray-600">
                Complete price transparency, guaranteed.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Price Breakdown
                </h3>
              </div>

              <div className="h-px bg-gray-100 mb-6" />

              <div className="space-y-4 mb-6">
                {priceItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-6" />

              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">
                  Total Payable
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹1,350
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                </div>
                <p className="text-sm text-green-800 font-medium">
                  You pay what you see. No hidden charges.
                </p>
              </div>
            </div>

            <div className="absolute -inset-6 bg-blue-100 rounded-3xl blur-3xl opacity-20 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}