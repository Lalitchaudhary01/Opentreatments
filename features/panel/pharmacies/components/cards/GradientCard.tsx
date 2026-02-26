"use client"

export function GradientCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow">
      {children}
    </div>
  )
}