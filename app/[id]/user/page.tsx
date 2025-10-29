import MyProfile from "@/features/user/components/MyProfile";

interface UserProfilePageProps {
  params: { id: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  // params.id = logged-in user id
  return <MyProfile />;
}
