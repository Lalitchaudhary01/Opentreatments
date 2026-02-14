import type { NextPage } from 'next';

const HeroSectio: NextPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center px-4 sm:px-8 lg:px-16">
      {/* Center Video Container - No Rounded Corners */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl aspect-[16/9] md:aspect-[2/1] lg:h-[65vh] lg:aspect-auto overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://ik.imagekit.io/gpo2lkfh1/landing%20page/vector3d.MOV/ik-video.mp4?updatedAt=1771081981879"
            type="video/mp4"
          />
        </video>

        {/* Stronger Radial Fade Overlay - Center to All Sides */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                rgba(255,255,255,0) 0%, 
                rgba(255,255,255,0.05) 15%,
                rgba(255,255,255,0.3) 35%,
                rgba(255,255,255,0.7) 60%, 
                rgba(255,255,255,0.95) 80%,
                rgba(255,255,255,1) 100%
              )
            `
          }}
        />

        {/* Extra Edge Fade Overlay - Top/Bottom/Left/Right */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, 
                rgba(255,255,255,1) 0%, 
                rgba(255,255,255,0) 5%,
                rgba(255,255,255,0) 95%,
                rgba(255,255,255,1) 100%
              ),
              linear-gradient(to bottom, 
                rgba(255,255,255,1) 0%, 
                rgba(255,255,255,0) 5%,
                rgba(255,255,255,0) 95%,
                rgba(255,255,255,1) 100%
              )
            `
          }}
        />
      </div>

      {/* Content - Centered Over Video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 text-center max-w-5xl leading-tight mb-8">
            Find and compare healthcare services near you
          </h1>

          <div className="flex justify-center">
            <button className="px-10 py-4 bg-[#5B9BD5] hover:bg-[#4A8BC4] text-white font-medium text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectio;