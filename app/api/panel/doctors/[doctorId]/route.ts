import { adminDeleteDoctorService } from "@/features/panel/doctor/services/adminUpdateDoctorProfile.service";
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

export async function DELETE(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    getAdmin(req);

    const result = await adminDeleteDoctorService(params.doctorId);

    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}