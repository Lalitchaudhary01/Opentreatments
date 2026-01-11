import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t border-border px-6">
      <div className="container mx-auto max-w-6xl py-14">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logos.png"
                alt="OpenTreatment"
                width={120}
                height={120}
                className="w-24 h-24"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              OpenTreatment helps patients compare doctors, hospitals,
              pharmacies, and labs with full price transparency — so you can
              choose the right care, before you start.
            </p>

            <Link
              href="/search"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Search & Compare Now
            </Link>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Compare Costs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Find Nearby Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Book Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenTreatment. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for transparency in healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
