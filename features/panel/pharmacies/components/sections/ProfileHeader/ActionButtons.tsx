"use client"

export function ActionButtons({
  onEdit,
}: {
  onEdit: () => void
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Edit Profile
      </button>
    </div>
  )
}