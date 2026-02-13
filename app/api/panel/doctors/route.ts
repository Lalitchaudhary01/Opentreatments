import { getDoctorProfileService } from "@/features/panel/doctor/services/getDoctorProfile.service";
import { submitDoctorProfileService } from "@/features/panel/doctor/services/submitDoctorProfile.service";
import { updateDoctorProfileService } from "@/features/panel/doctor/services/updateDoctorProfile.service";
import { verify } from "jsonwebtoken";


function getUser(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  return verify(token, process.env.JWT_SECRET!) as any;
}

/* ======================
   SUBMIT PROFILE (POST)
====================== */
export async function POST(req: Request) {
  try {
    const user = getUser(req);
    const body = await req.json();

    const doctor = await submitDoctorProfileService(
      user.id,
      body
    );

    return Response.json(doctor, { status: 201 });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

/* ======================
   GET PROFILE
====================== */
export async function GET(req: Request) {
  try {
    const user = getUser(req);

    const doctor = await getDoctorProfileService(user.id);

    return Response.json(doctor);

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 401 }
    );
  }
}

/* ======================
   UPDATE PROFILE (PUT)
====================== */
export async function PUT(req: Request) {
  try {
    const user = getUser(req);
    const body = await req.json();

    const updated = await updateDoctorProfileService(
      user.id,
      body
    );

    return Response.json(updated);

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}