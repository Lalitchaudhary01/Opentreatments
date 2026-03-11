"use client";

import Image from "next/image";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function PanelLoadingScreen({
  title = "Preparing your workspace",
  subtitle = "Securing session and loading your panel",
}: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070c18] px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#3b82f6]/20 blur-[90px]" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#14b8a6]/20 blur-[90px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3b82f6]/15" />
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#0f172a]/80 p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04]">
          <Image src="/Subtract.svg" alt="Open Treatment" width={34} height={34} className="object-contain" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-sm text-[#93a4bf]">{subtitle}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#3b82f6] [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#14b8a6] [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#3b82f6]" />
        </div>

        <div className="mx-auto mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-white/[0.07]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#3b82f6] to-[#14b8a6]" />
        </div>
      </div>
    </div>
  );
}
