import Image from "next/image";
import React from "react";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", icon: "/insta.svg", href: "#" },
    { name: "Twitter", icon: "/x.svg", href: "#" },
    { name: "LinkedIn", icon: "/linkedin.svg", href: "#" },
    { name: "Facebook", icon: "/facebook.svg", href: "#" },
  ];

  return (
    <footer className="relative bg-[#00161A] overflow-hidden text-white">
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-12 lg:py-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 xl:gap-20 mb-10 lg:mb-16">
          
          {/* Left Section - Brand Info */}
          <div className="w-full lg:max-w-md flex flex-col gap-5 lg:gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/Subtract.svg"
                alt="Open Treatment"
                width={51}
                height={72}
                className="w-10 h-auto sm:w-12 lg:w-[51px]"
              />
              <span className="text-xl sm:text-2xl font-bold text-[#ECF5FF]">
                Open Treatment
              </span>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-[#C7D2D8] max-w-md">
              Your trusted healthcare marketplace for transparent pricing
              and verified providers.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-[#18323A] hover:bg-[#39A4EC] transition-colors duration-200 flex items-center justify-center"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns - Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 xl:gap-16 text-[#C7D2D8] w-full lg:w-auto">
            
            {/* Product Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg sm:text-xl font-bold text-[#F3F8FB]">
                Product
              </h4>
              <div className="flex flex-col gap-2 text-base sm:text-lg">
                {['How it Works', 'For Providers', 'Pricing', 'Mobile App'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Marketplace Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg sm:text-xl font-bold text-[#F3F8FB]">
                Marketplace
              </h4>
              <div className="flex flex-col gap-2 text-base sm:text-lg">
                {['Find Doctors', 'Find Hospitals', 'Find Pharmacies', 'Find Labs', 'Compare Prices'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg sm:text-xl font-bold text-[#F3F8FB]">
                Support
              </h4>
              <div className="flex flex-col gap-2 text-base sm:text-lg">
                {['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy'].map((item) => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors w-fit">
                    {item}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-col gap-2 text-base sm:text-lg text-[#E6F6FF] mt-2">
                <p className="hover:text-white cursor-pointer transition-colors w-fit">99123-45678</p>
                <p className="hover:text-white cursor-pointer transition-colors break-all w-fit">
                  support@opentreatment.com
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#32505D] pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3 text-sm sm:text-base text-[#9FB0B9]">
            <span>© 2026 OpenTreatment. All rights reserved.</span>
            <span className="text-[#C7D2D8]">
              Serving 50+ cities across India
            </span>
          </div>
        </div>

      </div>

      {/* Background Text - CENTERED with same padding as container */}
      <div className="w-full overflow-hidden pb-2 lg:pb-4 pointer-events-none select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h1 className="
            text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[140px]
            font-extrabold
            leading-none
            font-['Plus_Jakarta_Sans']
            bg-gradient-to-r
            from-[#39A4EC]
            to-[#55B685]
            bg-clip-text
            text-transparent
            whitespace-nowrap
            opacity-90
            text-center
          ">
            Open Treatment
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;