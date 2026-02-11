import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-[#00161A] overflow-hidden text-white">

      {/* Fixed Height Like Figma */}
      <div className="relative h-[560px]">

        {/* Main Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-[72px] pt-[48px] pb-[80px] flex flex-col gap-[32px]">

          {/* Top Row */}
          <div className="flex justify-between gap-[113px]">

            {/* Left Section */}
            <div className="w-[452px] flex flex-col gap-[31px]">

              <div className="flex items-center gap-[16px]">
                <Image
                  src="/logo.png"
                  alt="Open Treatment"
                  width={51}
                  height={72}
                />
                <span className="text-[24px] font-bold leading-[32px] text-[#ECF5FF]">
                  Open Treatment
                </span>
              </div>

              <p className="w-[414px] text-[18px] leading-[28px] text-[#C7D2D8]">
                Your trusted healthcare marketplace for transparent pricing
                and verified providers.
              </p>

              <div className="flex gap-[16px]">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-[48px] h-[48px] rounded-full bg-[#18323A]"
                  />
                ))}
              </div>
            </div>

            {/* Right Columns */}
            <div className="flex gap-[56px] text-[#C7D2D8]">

              {/* Product */}
              <div className="w-[152px] flex flex-col gap-[24px]">
                <h4 className="text-[20px] font-bold text-[#F3F8FB] leading-[28px]">
                  Product
                </h4>
                <div className="flex flex-col gap-[8px] text-[18px] leading-[28px]">
                  <p>How it Works</p>
                  <p>For Providers</p>
                  <p>Pricing</p>
                  <p>Mobile App</p>
                </div>
              </div>

              {/* Marketplace */}
              <div className="w-[152px] flex flex-col gap-[24px]">
                <h4 className="text-[20px] font-bold text-[#F3F8FB] leading-[28px]">
                  Marketplace
                </h4>
                <div className="flex flex-col gap-[8px] text-[18px] leading-[28px]">
                  <p>Find Doctors</p>
                  <p>Find Hospitals</p>
                  <p>Find Pharmacies</p>
                  <p>Find Labs</p>
                  <p>Compare Prices</p>
                </div>
              </div>

              {/* Support */}
              <div className="w-[252px] flex flex-col gap-[28px]">
                <h4 className="text-[20px] font-bold text-[#F3F8FB] leading-[28px]">
                  Support
                </h4>

                <div className="flex flex-col gap-[8px] text-[18px] leading-[28px]">
                  <p>Help Center</p>
                  <p>Contact Us</p>
                  <p>Terms of Service</p>
                  <p>Privacy Policy</p>
                </div>

                <div className="flex flex-col gap-[12px] text-[18px] text-[#E6F6FF] leading-[28px]">
                  <p>99123-45678</p>
                  <p>support@opentreatment.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#32505D] pt-[24px] flex justify-between text-[18px] text-[#9FB0B9]">
            <span>© 2026 OpenTreatment. All rights reserved.</span>
            <span className="text-[#C7D2D8]">
              Serving 50+ cities across India
            </span>
          </div>

        </div>

        {/* Big Background Text */}
        <div className="absolute left-[72px] bottom-[-5px] pointer-events-none select-none">
          <h1 className="
  text-[162px]
  font-extrabold
  leading-[194.4px]
  font-['Plus_Jakarta_Sans']
  bg-gradient-to-r
  from-[#39A4EC]
  to-[#55B685]
  bg-clip-text
  text-transparent
">
  Open Treatment
</h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;