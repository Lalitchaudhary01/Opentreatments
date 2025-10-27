import MyProfile from "@/features/user/components/MyProfile";

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id } = await params; // must await it now

  // params.id = logged-in user id

  return <MyProfile />;
}
