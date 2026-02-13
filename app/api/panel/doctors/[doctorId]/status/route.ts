import { adminUpdateDoctorStatusService } from "@/features/panel/doctor/services/adminUpdateDoctorProfile.service";
import { verify } from "jsonwebtoken";


function getAdmin(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  const decoded: any = verify(token, process.env.JWT_SECRET!);

  if (decoded.role !== "ADMIN") {
    throw new Error("Admin only");
  }

  return decoded;
}

export async function PATCH(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    getAdmin(req);
    const body = await req.json();

    const updated = await adminUpdateDoctorStatusService(
      params.doctorId,
      body.status
    );

    return Response.json(updated);
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}