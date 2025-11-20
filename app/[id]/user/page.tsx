// import PatientProfileDashboard from "@/features/user/components/MyProfile";
// import MyProfile from "@/features/user/components/MyProfile";

import PatientProfileDashboard from "@/features/user/components/PatientProfileDashboard";

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id } = await params;
  // you can pass `id` if needed to MyProfile
  return <PatientProfileDashboard />;
}
