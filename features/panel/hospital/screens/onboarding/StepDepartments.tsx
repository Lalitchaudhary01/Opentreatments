"use client";

export default function StepDepartments({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Departments</h2>

      <textarea
        className="w-full border rounded p-2"
        placeholder="List major departments (e.g. Cardiology, Orthopedics)"
        value={data.departments || ""}
        onChange={(e) =>
          setData({ ...data, departments: e.target.value })
        }
      />
    </div>
  );
}
