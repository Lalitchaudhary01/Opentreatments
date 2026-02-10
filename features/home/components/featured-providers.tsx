"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function FeaturedProviders() {
  return (
    <section className="w-full bg-[#FBFDFE] py-[64px]">
      <div className="mx-auto max-w-[1296px] px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-semibold text-gray-900">
            Our Featured Providers
          </h2>
          <p className="text-gray-500 mt-2 text-[16px]">
            Browse trusted healthcare providers in your area
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <ProviderCard
            title="Doctors"
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/doctor.png"
            className="md:col-span-7"
          />
          <ProviderCard
            title="Labs"
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/labs.png"
            className="md:col-span-5"
          />
          <ProviderCard
            title="Pharmacies"
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/pharmacy.png"
            className="md:col-span-5"
          />
          <ProviderCard
            title="Hospitals"
            image="https://ik.imagekit.io/gpo2lkfh1/landing%20page/hospital.png"
            className="md:col-span-7"
          />
        </div>
      </div>
    </section>
  );
}

function ProviderCard({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <Card
      className={`relative h-[265px] rounded-[20px] overflow-hidden bg-[#EEF6FA] border border-[rgba(37,85,126,0.09)] ${className}`}
    >
      {/* Title */}
      <div className="absolute top-[20px] left-[20px] z-10 text-[18px] font-medium text-gray-800">
        {title}
      </div>

      {/* Image — bottom TOUCH */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="object-contain w-auto h-[220px]"
        />
      </div>
    </Card>
  );
}
