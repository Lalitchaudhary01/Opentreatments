"use client";

export default function StepVerification({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review & Submit</h2>
      <p className="text-muted-foreground">
        Please review your information before submitting.
      </p>

      <div className="space-y-4 border rounded-xl p-4 bg-muted/30">
        <Row label="Name" value={data.name} />
        <Row label="Gender" value={data.gender} />
        <Row label="Specialization" value={data.specialization} />
        <Row
          label="Experience"
          value={data.experience ? `${data.experience} years` : "-"}
        />
        <Row label="City" value={data.city} />
        <Row label="Fees" value={data.fees ? `₹${data.fees}` : "-"} />
        <Row
          label="Specialties"
          value={(data.specialties || []).join(", ") || "-"}
        />
        <Row
          label="Languages"
          value={(data.languages || []).join(", ") || "-"}
        />

        {data.availability && Object.keys(data.availability).length > 0 && (
          <div className="pt-2">
            <p className="text-sm font-semibold mb-1">Availability</p>
            <div className="text-sm space-y-1 text-muted-foreground">
              {Object.entries(data.availability).map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize">{day}</span>
                  <span>{String(time)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-orange-300 bg-orange-50 p-4 text-sm">
        <p className="font-semibold text-orange-800 mb-1">What happens next?</p>
        <p className="text-orange-700">
          Your profile will be sent for admin review. You’ll be notified once it
          is approved and goes live.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}
