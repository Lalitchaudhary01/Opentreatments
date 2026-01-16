"use client";

export default function StepFacilities({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Facilities</h2>

      <textarea
        className="w-full border rounded p-2"
        placeholder="Mention key facilities (ICU, MRI, Emergency, etc.)"
        value={data.facilities || ""}
        onChange={(e) =>
          setData({ ...data, facilities: e.target.value })
        }
      />
    </div>
  );
}
