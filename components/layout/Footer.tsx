import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-[#00161A] overflow-hidden text-white">

      {/* Responsive Height */}
      <div className="relative min-h-[560px] h-auto md:h-[560px]">

        {/* Main Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-[72px] py-8 md:pt-[48px] md:pb-[80px] flex flex-col gap-6 md:gap-[32px]">

          {/* Top Row - Stack on mobile */}
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-[113px]">

            {/* Left Section - Full width on mobile */}
            <div className="w-full lg:w-[452px] flex flex-col gap-6 lg:gap-[31px]">

              <div className="flex items-center gap-4 lg:gap-[16px]">
                <Image
                  src="/logo.png"
                  alt="Open Treatment"
                  width={51}
                  height={72}
                  className="w-[40px] h-auto md:w-[51px]"
                />
                <span className="text-xl md:text-[24px] font-bold leading-tight md:leading-[32px] text-[#ECF5FF]">
                  Open Treatment
                </span>
              </div>

              <p className="w-full lg:w-[414px] text-base md:text-[18px] leading-relaxed md:leading-[28px] text-[#C7D2D8]">
                Your trusted healthcare marketplace for transparent pricing
                and verified providers.
              </p>

              <div className="flex gap-4 md:gap-[16px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-[48px] md:h-[48px] rounded-full bg-[#18323A] hover:bg-[#39A4EC] transition-colors duration-200"
                  />
                ))}
              </div>
            </div>

            {/* Right Columns - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[56px] text-[#C7D2D8]">

              {/* Product */}
              <div className="w-full sm:w-[152px] flex flex-col gap-4 md:gap-[24px]">
                <h4 className="text-lg md:text-[20px] font-bold text-[#F3F8FB] leading-tight md:leading-[28px]">
                  Product
                </h4>
                <div className="flex flex-col gap-2 md:gap-[8px] text-base md:text-[18px] leading-relaxed md:leading-[28px]">
                  <p className="hover:text-white cursor-pointer transition-colors">How it Works</p>
                  <p className="hover:text-white cursor-pointer transition-colors">For Providers</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Pricing</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Mobile App</p>
                </div>
              </div>

              {/* Marketplace */}
              <div className="w-full sm:w-[152px] flex flex-col gap-4 md:gap-[24px]">
                <h4 className="text-lg md:text-[20px] font-bold text-[#F3F8FB] leading-tight md:leading-[28px]">
                  Marketplace
                </h4>
                <div className="flex flex-col gap-2 md:gap-[8px] text-base md:text-[18px] leading-relaxed md:leading-[28px]">
                  <p className="hover:text-white cursor-pointer transition-colors">Find Doctors</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Find Hospitals</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Find Pharmacies</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Find Labs</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Compare Prices</p>
                </div>
              </div>

              {/* Support */}
              <div className="w-full sm:w-[252px] flex flex-col gap-4 md:gap-[28px] sm:col-span-2 lg:col-span-1">
                <h4 className="text-lg md:text-[20px] font-bold text-[#F3F8FB] leading-tight md:leading-[28px]">
                  Support
                </h4>

                <div className="flex flex-col gap-2 md:gap-[8px] text-base md:text-[18px] leading-relaxed md:leading-[28px]">
                  <p className="hover:text-white cursor-pointer transition-colors">Help Center</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Contact Us</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
                  <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
                </div>

                <div className="flex flex-col gap-2 md:gap-[12px] text-base md:text-[18px] text-[#E6F6FF] leading-relaxed md:leading-[28px]">
                  <p className="hover:text-white cursor-pointer transition-colors">99123-45678</p>
                  <p className="hover:text-white cursor-pointer transition-colors break-words">support@opentreatment.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#32505D] pt-5 md:pt-[24px] flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 text-sm md:text-[18px] text-[#9FB0B9]">
            <span>© 2026 OpenTreatment. All rights reserved.</span>
            <span className="text-[#C7D2D8]">
              Serving 50+ cities across India
            </span>
          </div>

        </div>

        {/* Big Background Text - Responsive */}
        <div className="absolute left-4 sm:left-[72px] bottom-[-5px] pointer-events-none select-none opacity-30 md:opacity-100">
          <h1 className="
            text-4xl sm:text-6xl md:text-7xl lg:text-[162px]
            font-extrabold
            leading-tight lg:leading-[194.4px]
            font-['Plus_Jakarta_Sans']
            bg-gradient-to-r
            from-[#39A4EC]
            to-[#55B685]
            bg-clip-text
            text-transparent
            whitespace-nowrap
          ">
            Open Treatment
          </h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;