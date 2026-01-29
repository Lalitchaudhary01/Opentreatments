import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[rgba(0,22,26,1)] h-[520px] w-full text-white">
      {/* Main Content */}
      <div className="w-[1280px] h-[448px] pt-[48px] pb-[32px] flex flex-col gap-[24px] opacity-100 mx-auto">
        {/* Content Row */}
        <div className="flex justify-between px-[72px]">
          {/* Left */}
          <div className="w-[452px]">
            <div className="flex items-start gap-[12px] mb-4">
              <img
                src="/logo.png"
                className="w-[51px] h-[72px] object-contain"
              />

              <span
                className='
      font-["Plus_Jakarta_Sans"]
      font-[700]
      text-[24px]
      leading-[32px]
      text-white
      mt-[18px]
    '
              >
                OpenTreatment
              </span>
            </div>

            <p className='w-[414px] text-[18px] leading-[28px] font-["Plus_Jakarta_Sans"] text-[rgba(199,210,216,1)]'>
              Your trusted healthcare marketplace for transparent pricing and
              verified providers.
            </p>

            <div className="flex gap-3 mt-6">
              <div className="w-8 h-8 rounded-full border border-white/30" />
              <div className="w-8 h-8 rounded-full border border-white/30" />
              <div className="w-8 h-8 rounded-full border border-white/30" />
              <div className="w-8 h-8 rounded-full border border-white/30" />
            </div>
          </div>

          {/* Right Columns */}
          <div className="flex gap-[96px] text-[rgba(199,210,216,1)]">
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <p>How it Works</p>
              <p>For Providers</p>
              <p>Pricing</p>
              <p>Mobile App</p>
            </div>

            <div>
              <h4 className="text-white mb-4">Marketplace</h4>
              <p>Find Doctors</p>
              <p>Find Hospitals</p>
              <p>Find Labs</p>
              <p>Compare Prices</p>
            </div>

            <div>
              <h4 className="text-white mb-4">Support</h4>
              <p>Help Center</p>
              <p>Contact US</p>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
              <p className="mt-4">📞 99123-45678</p>
              <p>✉️ support@opentreatment.com</p>
            </div>
          </div>
        </div>

        {/* Divider Wrapper (Separate Div) */}
        <div className="px-[72px] mt-[12px]">
          <div className="h-px bg-white/20 mb-3" />
          <div className="flex justify-between text-sm text-[rgba(199,210,216,1)]">
            <span>© 2026 OpenTreatment. All rights reserved.</span>
            <span>📍 Serving 50+ cities across India</span>
          </div>
        </div>
      </div>

      {/* Big Gradient Text */}
      {/* Big Gradient Text Wrapper */}
      <div className="absolute bottom-[30px] left-[70px] w-[1294px] h-[194px] flex items-center overflow-hidden">
        <h1
          className='
      w-full
      font-["Plus_Jakarta_Sans"]
      font-[800]
      text-[162px]
      leading-[120%]
      bg-gradient-to-r from-[#39A4EC] to-[#55B685]
      bg-clip-text text-transparent
      pointer-events-none
      text-left
    '
        >
          OpenTreatment
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
