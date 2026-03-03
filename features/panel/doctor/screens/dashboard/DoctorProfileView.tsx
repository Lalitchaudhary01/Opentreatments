// "use client";

// import dynamic from "next/dynamic";
// import { DoctorProfile } from "@/features/panel/doctor/types/";
// import {
//   ProfileHeaderSkeleton,
//   StatsCardsSkeleton,
//   SectionSkeleton,
// } from "../../components/ui/skeletons";

// // Lazy sections
// const ProfileHeader = dynamic(
//   () => import("../../components/sections").then((m) => m.ProfileHeader),
//   { loading: () => <ProfileHeaderSkeleton /> }
// );

// const StatsSection = dynamic(
//   () => import("../../components/sections").then((m) => m.StatsSection),
//   { loading: () => <StatsCardsSkeleton /> }
// );

// const PersonalInfoSection = dynamic(
//   () => import("../../components/sections").then((m) => m.PersonalInfoSection),
//   { loading: () => <SectionSkeleton /> }
// );

// const ProfessionalDetailsSection = dynamic(
//   () =>
//     import("../../components/sections").then(
//       (m) => m.ProfessionalDetailsSection
//     ),
//   { loading: () => <SectionSkeleton /> }
// );

// const ClinicDetailsSection = dynamic(
//   () => import("../../components/sections").then((m) => m.ClinicDetailsSection),
//   { loading: () => <SectionSkeleton /> }
// );

// const AvailabilitySection = dynamic(
//   () => import("../../components/sections").then((m) => m.AvailabilitySection),
//   { loading: () => <SectionSkeleton /> }
// );

// const VerificationSection = dynamic(
//   () => import("../../components/sections").then((m) => m.VerificationSection),
//   { loading: () => <SectionSkeleton /> }
// );

// const AdminNotesSection = dynamic(
//   () => import("../../components/sections").then((m) => m.AdminNotesSection),
//   { loading: () => <SectionSkeleton /> }
// );

// export default function DoctorProfileView({
//   profile,
//   isAdmin = false,
// }: {
//   profile: DoctorProfile;
//   isAdmin?: boolean;
// }) {
//   return (
//     <div className="px-6 py-4 space-y-6">
//       <ProfileHeader profile={profile} />

//       <StatsSection profile={profile} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <PersonalInfoSection profile={profile} />
//         <ProfessionalDetailsSection profile={profile} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ClinicDetailsSection profile={profile} />
//         <AvailabilitySection profile={profile} />
//       </div>

//       <VerificationSection profile={profile} />

//       {isAdmin && <AdminNotesSection profile={profile} />}
//     </div>
//   );
// }
