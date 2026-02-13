import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-[#00161A] overflow-hidden text-white">
      {/* Main Container - No fixed heights, natural flow */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-[72px] py-12 sm:py-16 lg:py-[48px]">
        
        {/* Top Section - Logo, Description, Social */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-[80px] xl:gap-[113px] mb-12 lg:mb-[60px]">
          
          {/* Left Section - Brand Info */}
          <div className="w-full lg:w-[400px] xl:w-[452px] flex flex-col gap-5 lg:gap-[31px]">
            <div className="flex items-center gap-3 sm:gap-[16px]">
              <Image
  src="/logo.png"
  alt="Open Treatment"
  width={91}
  height={72}
  className="w-[60px] h-auto sm:w-[72px] lg:w-[91px]"
/>
              <span className="text-xl sm:text-[22px] lg:text-[24px] font-bold leading-tight lg:leading-[32px] text-[#ECF5FF]">
                Open Treatment
              </span>
            </div>

            <p className="w-full lg:w-[380px] xl:w-[414px] text-base lg:text-[18px] leading-relaxed lg:leading-[28px] text-[#C7D2D8]">
              Your trusted healthcare marketplace for transparent pricing
              and verified providers.
            </p>

            <div className="flex gap-3 sm:gap-[16px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 sm:w-[44px] sm:h-[44px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#18323A] hover:bg-[#39A4EC] transition-colors duration-200 cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Right Columns - Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[40px] xl:gap-[56px] text-[#C7D2D8] w-full lg:w-auto">
            
            {/* Product Column */}
            <div className="flex flex-col gap-4 lg:gap-[24px]">
              <h4 className="text-lg lg:text-[20px] font-bold text-[#F3F8FB] leading-tight lg:leading-[28px]">
                Product
              </h4>
              <div className="flex flex-col gap-2 lg:gap-[8px] text-base lg:text-[18px] leading-relaxed lg:leading-[28px]">
                {['How it Works', 'For Providers', 'Pricing', 'Mobile App'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Marketplace Column */}
            <div className="flex flex-col gap-4 lg:gap-[24px]">
              <h4 className="text-lg lg:text-[20px] font-bold text-[#F3F8FB] leading-tight lg:leading-[28px]">
                Marketplace
              </h4>
              <div className="flex flex-col gap-2 lg:gap-[8px] text-base lg:text-[18px] leading-relaxed lg:leading-[28px]">
                {['Find Doctors', 'Find Hospitals', 'Find Pharmacies', 'Find Labs', 'Compare Prices'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-4 lg:gap-[28px] sm:col-span-2 lg:col-span-1">
              <h4 className="text-lg lg:text-[20px] font-bold text-[#F3F8FB] leading-tight lg:leading-[28px]">
                Support
              </h4>
              <div className="flex flex-col gap-2 lg:gap-[8px] text-base lg:text-[18px] leading-relaxed lg:leading-[28px]">
                {['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-col gap-2 lg:gap-[12px] text-base lg:text-[18px] text-[#E6F6FF] leading-relaxed lg:leading-[28px] mt-2">
                <p className="hover:text-white cursor-pointer transition-colors w-fit">99123-45678</p>
                <p className="hover:text-white cursor-pointer transition-colors break-all sm:break-words w-fit">
                  support@opentreatment.com
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        {/* Divider section */}
<div className="border-t border-[#32505D] pt-6 lg:pt-[24px] mb-0 lg:mb-[8px]">
  
  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 text-sm lg:text-[18px] text-[#9FB0B9]">
    <span>© 2026 OpenTreatment. All rights reserved.</span>
    <span className="text-[#C7D2D8]">
      Serving 50+ cities across India
    </span>
  </div>
</div>

      </div>

      {/* Background Text - Responsive sizing, no overlap */}
      {/* Background Text */}
<div className="relative w-full overflow-hidden pb-4 lg:pb-8 pointer-events-none select-none">
  <h1 className="
    text-[48px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[162px]
    font-extrabold
    leading-[1.1] lg:leading-[194.4px]
    font-['Plus_Jakarta_Sans']
    bg-gradient-to-r
    from-[#39A4EC]
    to-[#55B685]
    bg-clip-text
    text-transparent
    whitespace-nowrap
    opacity-90
    translate-y-[-10px] lg:translate-y-[-20px]
    px-4 sm:px-6 lg:px-8 xl:px-[72px]
  ">
    Open Treatment
  </h1>
</div>
    </footer>
  );
};

export default Footer;