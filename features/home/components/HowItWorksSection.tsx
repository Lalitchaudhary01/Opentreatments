"use client";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search",
      desc: "Find doctors, hospitals, pharmacies, or labs near you",
    },
    {
      title: "Compare",
      desc: "Compare prices, ratings, and availability side-by-side",
    },
    {
      title: "Decide",
      desc: "Choose the best option based on your needs",
    },
    {
      title: "Book",
      desc: "Book instantly with transparent pricing",
    },
  ];

  return (
    <section className="w-full bg-[#EFF7F4] py-[96px]">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Heading */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[56px] font-bold text-[#0F2D1E]">How it works</h2>
          <p className="text-[20px] text-[#5F7A6B] mt-3">
            Four simple steps to better healthcare decisions
          </p>
        </div>

        {/* Illustration boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] mb-[40px]">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-[140px] rounded-[12px] border border-[#CFE3DA] bg-white"
            />
          ))}
        </div>

        {/* Line + Numbers */}
        <div className="relative mb-[40px]">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#1DBF73]" />
          <div className="relative grid grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-center">
                <div className="w-[36px] h-[36px] rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-sm font-semibold">
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Titles + descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] text-center">
          {steps.map((step, i) => (
            <div key={i}>
              <h4 className="text-[28px] font-semibold text-[#0F2D1E]">
                {step.title}
              </h4>
              <p className="text-[14px] text-[#5F7A6B] mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
