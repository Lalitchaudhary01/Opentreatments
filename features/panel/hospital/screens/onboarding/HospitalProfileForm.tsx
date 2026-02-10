"use client";

export default function StepBasicInfo({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <input
        className="w-full border rounded p-2"
        placeholder="Hospital Name"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        className="w-full border rounded p-2"
        placeholder="City"
        value={data.city || ""}
        onChange={(e) => setData({ ...data, city: e.target.value })}
      />

      <input
        className="w-full border rounded p-2"
        placeholder="Phone"
        value={data.phone || ""}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
      />

      <input
        className="w-full border rounded p-2"
        placeholder="Email"
        value={data.email || ""}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
    </div>
  );
}
