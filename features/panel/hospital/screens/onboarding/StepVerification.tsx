"use client";

export default function StepVerification({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Verification</h2>

      <input
        className="w-full border rounded p-2"
        placeholder="Website (optional)"
        value={data.website || ""}
        onChange={(e) => setData({ ...data, website: e.target.value })}
      />

      <p className="text-sm text-muted-foreground">
        Your hospital will be reviewed by admin before approval.
      </p>
    </div>
  );
}
