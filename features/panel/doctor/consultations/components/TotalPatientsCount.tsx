// components/TotalPatientsCount.tsx
import prisma from "@/lib/prisma";

interface TotalPatientsCountProps {
  doctorId: string;
  className?: string;
  showLabel?: boolean;
}

export default async function TotalPatientsCount({ 
  doctorId, 
  className = "",
  showLabel = true 
}: TotalPatientsCountProps) {
  
  // Fetch counts
  const [onlineCount, offlineCount] = await Promise.all([
    prisma.independentConsultation.count({ 
      where: { 
        doctorId, 
        status: "APPROVED" 
      } 
    }),
    prisma.offlineConsultation.count({ 
      where: { 
        doctorId 
      } 
    })
  ]);

  const totalPatients = onlineCount + offlineCount;

  return (
    <div className={className}>
      {showLabel ? (
        <div>
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
        </div>
      ) : (
        <span className="font-bold">{totalPatients}</span>
      )}
    </div>
  );
}