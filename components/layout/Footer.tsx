import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo + Tagline */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/logos.png"
                alt="Logo"
                width={120}
                height={120}
                className="w-24 h-24 md:w-28 md:h-28"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making healthcare costs transparent and accessible for everyone.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cost Comparison
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Insurance Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Doctor Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-foreground">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenTreatment. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
