import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Clock, CheckCircle2 } from "lucide-react";

export default function HeroSectio() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            Find and compare<br />
            healthcare services<br />
            near you
          </h1>
          
          {/* Video Placeholder Container */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* Checkerboard pattern background */}
            <div className="absolute inset-0 opacity-30" 
                 style={{
                   backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                     linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                     linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                     linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                 }}>
            </div>
            
            {/* Video placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Video Placeholder</p>
               
              </div>
            </div>

            {/* Optional: Video element (commented out for placeholder) */}
            {/* <video 
              className="w-full h-full object-cover"
              controls
              poster="/video-thumbnail.jpg"
            >
              <source src="/your-video.mp4" type="video/mp4" />
            </video> */}
          </div>
        </div>

        {/* Search Section Below Video */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 -mt-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search specialty / doctors / hospitals / tests" 
                className="pl-10 h-12 text-base border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Search
            </Button>
          </div>
        </div>

        {/* Features Row */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-blue-600" />
            </div>
            <span>Transparent prices</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-3 h-3 text-green-600" />
            </div>
            <span>Verified providers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
              <Clock className="w-3 h-3 text-purple-600" />
            </div>
            <span>Quick booking</span>
          </div>
        </div>
      </div>
    </section>
  );
}