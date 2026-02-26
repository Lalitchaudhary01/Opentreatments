"use client"

export function BaseCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow ${className}`}>
      {children}
    </div>
  )
}