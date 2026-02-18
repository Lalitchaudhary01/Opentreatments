import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeMap = {
    sm: { width: 80, height: 50, text: "text-xl" },
    md: { width: 120, height: 80, text: "text-2xl" },
    lg: { width: 130, height: 80, text: "text-3xl" },
  };

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logos.png"
        alt="Open Treatment Logo"
        width={sizeMap[size].width}
        height={sizeMap[size].height}
        className="object-contain"
      />
      {/* {showText && (
        <div className={`flex items-center gap-2 ${sizeMap[size].text} font-bold`}>
          <span className="text-cyan-500">Open</span>
          <span className="text-teal-500">Treatment</span>
        </div>
      )} */}
    </div>
  );
}