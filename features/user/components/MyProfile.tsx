// "use client";

// import { useState, useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ChevronDown,
//   Crown,
//   FileText,
//   MoreVertical,
//   Upload,
//   User,
//   Phone,
//   TrendingUp,
//   Plus,
//   Trash2,
//   Edit3,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import Header from "@/components/layout/Header";

// // Types define karte hain
// interface PatientData {
//   name: string;
//   age: number;
//   bloodGroup: string;
//   gender: string;
//   lastVisit: string;
//   nextAppointment: string;
//   doctor: string;
//   healthScore: number;
//   memberSince: string;
//   dateOfBirth: string;
//   height: string;
//   weight: string;
//   emergencyContact: string;
//   address: string;
// }

// interface MedicalData {
//   conditions: string[];
//   medications: { name: string; dosage: string; for: string }[];
//   allergies: string[];
//   procedures: string[];
// }

// interface Appointment {
//   id: number;
//   date: string;
//   time: string;
//   doctor: string;
//   type: string;
//   status: "upcoming" | "completed" | "cancelled";
// }

// interface Document {
//   id: number;
//   name: string;
//   date: string;
//   type: string;
//   size: string;
// }

// export default function PatientProfileDashboard() {
//   const { data: session, status } = useSession();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [patientData, setPatientData] = useState<PatientData | null>(null);
//   const [medicalData, setMedicalData] = useState<MedicalData | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [documents, setDocuments] = useState<Document[]>([]);

//   useEffect(() => {
//     if (status === "loading") {
//       setLoading(true);
//       return;
//     }

//     if (status === "unauthenticated") {
//       signIn();
//       return;
//     }

//     if (session?.user) {
//       const user = session.user as any;

//       // Initialize all data
//       setPatientData({
//         name: user.name || "User",
//         age: 34,
//         bloodGroup: "O+",
//         gender: "Female",
//         lastVisit: "15 Jan 2024",
//         nextAppointment: "20 Feb 2024",
//         doctor: "Dr. Michael Rodriguez",
//         healthScore: 87,
//         memberSince: "2020",
//         dateOfBirth: "15 March 1990",
//         height: "165",
//         weight: "62",
//         emergencyContact: "James Chen - +1 (555) 987-6543",
//         address: "123 Health Street, Medville, CA 94301",
//       });

//       setMedicalData({
//         conditions: ["Asthma (Mild)", "Seasonal Allergies"],
//         medications: [
//           { name: "Albuterol Inhaler", dosage: "As needed", for: "Asthma" },
//           { name: "Loratadine", dosage: "10mg daily", for: "Allergies" },
//         ],
//         allergies: ["Penicillin", "Peanuts", "Dust Mites"],
//         procedures: ["Appendectomy (2015)", "Wisdom Teeth Removal (2018)"],
//       });

//       setAppointments([
//         {
//           id: 1,
//           date: "20 Feb 2024",
//           time: "10:00 AM",
//           doctor: "Dr. Michael Rodriguez",
//           type: "Regular Checkup",
//           status: "upcoming",
//         },
//         {
//           id: 2,
//           date: "15 Jan 2024",
//           time: "2:30 PM",
//           doctor: "Dr. Sarah Johnson",
//           type: "Dermatology Consultation",
//           status: "completed",
//         },
//         {
//           id: 3,
//           date: "5 Dec 2023",
//           time: "11:15 AM",
//           doctor: "Dr. Michael Rodriguez",
//           type: "Follow-up Visit",
//           status: "completed",
//         },
//       ]);

//       setDocuments([
//         {
//           id: 1,
//           name: "Blood Test Results - Jan 2024.pdf",
//           date: "15 Jan 2024",
//           type: "Lab Report",
//           size: "2.4 MB",
//         },
//         {
//           id: 2,
//           name: "X-Ray Chest - Dec 2023.pdf",
//           date: "5 Dec 2023",
//           type: "Imaging",
//           size: "5.7 MB",
//         },
//         {
//           id: 3,
//           name: "Prescription - Nov 2023.pdf",
//           date: "20 Nov 2023",
//           type: "Prescription",
//           size: "1.2 MB",
//         },
//       ]);

//       setLoading(false);
//     }
//   }, [session, status]);

//   if (loading || !patientData || !medicalData) {
//     return (
//       <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   const user = session?.user as any;
//   const stats = [
//     { label: "Health Score", value: "87%", trend: "+2.5%" },
//     { label: "Medication Adherence", value: "92%", trend: "+1.2%" },
//     { label: "Appointment Attendance", value: "95%", trend: "+0.8%" },
//   ];

//   const userInitials = user.name?.charAt(0).toUpperCase() || "U";

//   const handleSaveProfile = () => {
//     console.log("Saving patient data:", patientData);
//     setIsEditing(false);
//   };

//   const handleCancelEdit = () => {
//     // Reset to original data
//     if (session?.user) {
//       const user = session.user as any;
//       setPatientData({
//         name: user.name || "User",
//         age: 34,
//         bloodGroup: "O+",
//         gender: "Female",
//         lastVisit: "15 Jan 2024",
//         nextAppointment: "20 Feb 2024",
//         doctor: "Dr. Michael Rodriguez",
//         healthScore: 87,
//         memberSince: "2020",
//         dateOfBirth: "15 March 1990",
//         height: "165",
//         weight: "62",
//         emergencyContact: "James Chen - +1 (555) 987-6543",
//         address: "123 Health Street, Medville, CA 94301",
//       });
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
//       <Header />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Same as before */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
//               <CardContent className="p-6">
//                 <div className="flex flex-col items-center text-center">
//                   <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
//                     <AvatarImage
//                       src={user.image || "/api/placeholder/96/96"}
//                       alt={user.name}
//                     />
//                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
//                       {userInitials}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="mt-4">
//                     <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                       {user.name}
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-400 mt-1">
//                       {patientData.age} years • {patientData.bloodGroup}
//                     </p>
//                   </div>

//                   <div className="flex gap-2 mt-4">
//                     <Badge
//                       variant="secondary"
//                       className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
//                     >
//                       Premium Member
//                     </Badge>
//                     <Badge
//                       variant="secondary"
//                       className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
//                     >
//                       Active
//                     </Badge>
//                   </div>
//                 </div>

//                 <Separator className="my-6" />

//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Last Visit
//                     </span>
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       {patientData.lastVisit}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Next Appointment
//                     </span>
//                     <span className="font-semibold text-blue-600 dark:text-blue-400">
//                       {patientData.nextAppointment}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Primary Doctor
//                     </span>
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       {patientData.doctor}
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Quick Stats */}
//             <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Health Overview
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {stats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">
//                         {stat.label}
//                       </p>
//                       <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <Badge
//                       variant="secondary"
//                       className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
//                     >
//                       {stat.trend}
//                     </Badge>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg border-0">
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-2xl font-bold mb-2">
//                       Welcome back, {user.name?.split(" ")[0]}!
//                     </h2>
//                     <p className="text-blue-100 opacity-90">
//                       Your health journey is looking great. Keep up the good
//                       work!
//                     </p>
//                   </div>
//                   <Crown className="w-8 h-8 text-yellow-300" />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Tab Navigation */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//               <div className="flex border-b border-gray-200 dark:border-gray-700">
//                 {["profile", "medical", "appointments", "documents"].map(
//                   (tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
//                         activeTab === tab
//                           ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
//                           : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                       }`}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                   )
//                 )}
//               </div>

//               <div className="p-6">
//                 {activeTab === "profile" && (
//                   <ProfileContent
//                     user={user}
//                     patientData={patientData}
//                     setPatientData={setPatientData}
//                     isEditing={isEditing}
//                     setIsEditing={setIsEditing}
//                     onSave={handleSaveProfile}
//                     onCancel={handleCancelEdit}
//                   />
//                 )}
//                 {activeTab === "medical" && (
//                   <MedicalContent
//                     medicalData={medicalData}
//                     setMedicalData={setMedicalData}
//                   />
//                 )}
//                 {activeTab === "appointments" && (
//                   <AppointmentsContent
//                     appointments={appointments}
//                     setAppointments={setAppointments}
//                   />
//                 )}
//                 {activeTab === "documents" && (
//                   <DocumentsContent
//                     documents={documents}
//                     setDocuments={setDocuments}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ProfileContent (same as before)
// function ProfileContent({
//   user,
//   patientData,
//   setPatientData,
//   isEditing,
//   setIsEditing,
//   onSave,
//   onCancel,
// }: {
//   user: any;
//   patientData: PatientData;
//   setPatientData: (data: PatientData) => void;
//   isEditing: boolean;
//   setIsEditing: (editing: boolean) => void;
//   onSave: () => void;
//   onCancel: () => void;
// }) {
//   const personalInfo = [
//     {
//       label: "Full Name",
//       value: user.name,
//       editable: false,
//       key: "name",
//     },
//     {
//       label: "Date of Birth",
//       value: `${patientData.dateOfBirth} (${patientData.age} years)`,
//       editable: true,
//       key: "dateOfBirth",
//     },
//     {
//       label: "Gender",
//       value: patientData.gender,
//       editable: true,
//       key: "gender",
//     },
//     {
//       label: "Blood Group",
//       value: patientData.bloodGroup,
//       editable: true,
//       key: "bloodGroup",
//     },
//     {
//       label: "Height",
//       value: `${patientData.height} cm`,
//       editable: true,
//       key: "height",
//     },
//     {
//       label: "Weight",
//       value: `${patientData.weight} kg`,
//       editable: true,
//       key: "weight",
//     },
//   ];

//   const contactInfo = [
//     {
//       label: "Email",
//       value: user.email,
//       editable: false,
//       key: "email",
//     },
//     {
//       label: "Phone",
//       value: user.phone || "Not provided",
//       editable: false,
//       key: "phone",
//     },
//     {
//       label: "Emergency Contact",
//       value: patientData.emergencyContact,
//       editable: true,
//       key: "emergencyContact",
//     },
//     {
//       label: "Address",
//       value: patientData.address,
//       editable: true,
//       key: "address",
//     },
//   ];

//   const handleInputChange = (key: keyof PatientData, value: string) => {
//     setPatientData({
//       ...patientData,
//       [key]: value,
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Personal Information
//         </h3>
//         <div className="flex gap-2">
//           {isEditing ? (
//             <>
//               <Button variant="outline" size="sm" onClick={onCancel}>
//                 Cancel
//               </Button>
//               <Button size="sm" onClick={onSave}>
//                 Save Changes
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit Profile
//             </Button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-base font-semibold flex items-center gap-2">
//               <User className="w-4 h-4" />
//               Personal Details
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {personalInfo.map((info, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <Label className="text-sm text-gray-500 dark:text-gray-400">
//                   {info.label}
//                 </Label>
//                 <div className="text-right">
//                   {isEditing && info.editable ? (
//                     info.key === "gender" ? (
//                       <Select
//                         value={patientData[info.key]}
//                         onValueChange={(value) =>
//                           handleInputChange(info.key, value)
//                         }
//                       >
//                         <SelectTrigger className="w-32 h-8">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Male">Male</SelectItem>
//                           <SelectItem value="Female">Female</SelectItem>
//                           <SelectItem value="Other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     ) : info.key === "bloodGroup" ? (
//                       <Select
//                         value={patientData[info.key]}
//                         onValueChange={(value) =>
//                           handleInputChange(info.key, value)
//                         }
//                       >
//                         <SelectTrigger className="w-20 h-8">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="A+">A+</SelectItem>
//                           <SelectItem value="A-">A-</SelectItem>
//                           <SelectItem value="B+">B+</SelectItem>
//                           <SelectItem value="B-">B-</SelectItem>
//                           <SelectItem value="O+">O+</SelectItem>
//                           <SelectItem value="O-">O-</SelectItem>
//                           <SelectItem value="AB+">AB+</SelectItem>
//                           <SelectItem value="AB-">AB-</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     ) : (
//                       <Input
//                         value={patientData[info.key]}
//                         onChange={(e) =>
//                           handleInputChange(info.key, e.target.value)
//                         }
//                         className="w-32 h-8 text-sm"
//                       />
//                     )
//                   ) : (
//                     <span className="text-sm font-medium text-gray-900 dark:text-white">
//                       {info.value}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-base font-semibold flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               Contact Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {contactInfo.map((info, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <Label className="text-sm text-gray-500 dark:text-gray-400">
//                   {info.label}
//                 </Label>
//                 <div className="text-right flex-1 max-w-[200px]">
//                   {isEditing && info.editable ? (
//                     <Input
//                       value={patientData[info.key]}
//                       onChange={(e) =>
//                         handleInputChange(info.key, e.target.value)
//                       }
//                       className="h-8 text-sm"
//                     />
//                   ) : (
//                     <span className="text-sm font-medium text-gray-900 dark:text-white block truncate">
//                       {info.value}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// // Updated MedicalContent with editing functionality
// function MedicalContent({
//   medicalData,
//   setMedicalData,
// }: {
//   medicalData: MedicalData;
//   setMedicalData: (data: MedicalData) => void;
// }) {
//   const [expandedSections, setExpandedSections] = useState<string[]>([]);
//   const [editingSection, setEditingSection] = useState<string | null>(null);
//   const [newItem, setNewItem] = useState("");

//   const toggleSection = (section: string) => {
//     setExpandedSections((prev) =>
//       prev.includes(section)
//         ? prev.filter((s) => s !== section)
//         : [...prev, section]
//     );
//   };

//   const startEditing = (section: string) => {
//     setEditingSection(section);
//     setNewItem("");
//   };

//   const stopEditing = () => {
//     setEditingSection(null);
//     setNewItem("");
//   };

//   const addItem = (section: keyof MedicalData) => {
//     if (newItem.trim()) {
//       if (section === "medications") {
//         // Medications ke liye special handling
//         const newMedication = { name: newItem, dosage: "", for: "" };
//         setMedicalData({
//           ...medicalData,
//           medications: [...medicalData.medications, newMedication],
//         });
//       } else {
//         setMedicalData({
//           ...medicalData,
//           [section]: [...medicalData[section], newItem],
//         });
//       }
//       setNewItem("");
//     }
//   };

//   const removeItem = (section: keyof MedicalData, index: number) => {
//     const newItems = medicalData[section].filter((_, i) => i !== index);
//     setMedicalData({
//       ...medicalData,
//       [section]: newItems,
//     });
//   };

//   const updateMedication = (index: number, field: string, value: string) => {
//     const updatedMedications = medicalData.medications.map((med, i) =>
//       i === index ? { ...med, [field]: value } : med
//     );
//     setMedicalData({
//       ...medicalData,
//       medications: updatedMedications,
//     });
//   };

//   const sections = [
//     {
//       key: "conditions",
//       title: "Current Conditions",
//       icon: TrendingUp,
//       data: medicalData.conditions,
//     },
//     {
//       key: "medications",
//       title: "Current Medications",
//       icon: FileText,
//       data: medicalData.medications,
//     },
//     {
//       key: "allergies",
//       title: "Allergies",
//       icon: "⚠️",
//       data: medicalData.allergies,
//     },
//     {
//       key: "procedures",
//       title: "Past Procedures",
//       icon: "🏥",
//       data: medicalData.procedures,
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Medical History
//         </h3>
//         <Button variant="outline" size="sm">
//           <Plus className="w-4 h-4 mr-2" />
//           Add New Record
//         </Button>
//       </div>

//       {sections.map(({ key, title, icon: Icon, data }) => (
//         <Card key={key}>
//           <CardContent className="p-0">
//             <div className="flex items-center justify-between p-4">
//               <button
//                 onClick={() => toggleSection(key)}
//                 className="flex items-center gap-3 text-left flex-1"
//               >
//                 {typeof Icon === "string" ? (
//                   <span>{Icon}</span>
//                 ) : (
//                   <Icon className="w-4 h-4 text-blue-600" />
//                 )}
//                 <span className="font-semibold text-gray-900 dark:text-white">
//                   {title}
//                 </span>
//               </button>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => startEditing(key)}
//                 >
//                   <Edit3 className="w-4 h-4" />
//                 </Button>
//                 <ChevronDown
//                   className={`w-4 h-4 text-gray-500 transition-transform ${
//                     expandedSections.includes(key) ? "rotate-180" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             {expandedSections.includes(key) && (
//               <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
//                 {/* Add new item */}
//                 {editingSection === key && (
//                   <div className="flex gap-2">
//                     <Input
//                       value={newItem}
//                       onChange={(e) => setNewItem(e.target.value)}
//                       placeholder={`Add new ${title.toLowerCase()}`}
//                       className="flex-1"
//                     />
//                     <Button onClick={() => addItem(key as keyof MedicalData)}>
//                       Add
//                     </Button>
//                     <Button variant="outline" onClick={stopEditing}>
//                       Cancel
//                     </Button>
//                   </div>
//                 )}

//                 {/* Display items */}
//                 {data.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between py-2 first:pt-0 last:pb-0 group"
//                   >
//                     <div className="flex-1">
//                       {key === "medications" ? (
//                         <div className="grid grid-cols-3 gap-2">
//                           <Input
//                             value={(item as any).name}
//                             onChange={(e) =>
//                               updateMedication(index, "name", e.target.value)
//                             }
//                             placeholder="Medication name"
//                           />
//                           <Input
//                             value={(item as any).dosage}
//                             onChange={(e) =>
//                               updateMedication(index, "dosage", e.target.value)
//                             }
//                             placeholder="Dosage"
//                           />
//                           <Input
//                             value={(item as any).for}
//                             onChange={(e) =>
//                               updateMedication(index, "for", e.target.value)
//                             }
//                             placeholder="For condition"
//                           />
//                         </div>
//                       ) : (
//                         <span className="text-sm text-gray-600 dark:text-gray-300">
//                           {item as string}
//                         </span>
//                       )}
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() =>
//                         removeItem(key as keyof MedicalData, index)
//                       }
//                       className="opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </Button>
//                   </div>
//                 ))}

//                 {data.length === 0 && (
//                   <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
//                     No {title.toLowerCase()} added yet.
//                   </p>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// // Updated AppointmentsContent with editing functionality
// function AppointmentsContent({
//   appointments,
//   setAppointments,
// }: {
//   appointments: Appointment[];
//   setAppointments: (appointments: Appointment[]) => void;
// }) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
//     date: "",
//     time: "",
//     doctor: "",
//     type: "",
//     status: "upcoming",
//   });

//   const startAdd = () => {
//     setIsAdding(true);
//     setNewAppointment({
//       date: "",
//       time: "",
//       doctor: "",
//       type: "",
//       status: "upcoming",
//     });
//   };

//   const cancelAdd = () => {
//     setIsAdding(false);
//     setEditingId(null);
//     setNewAppointment({});
//   };

//   const saveAppointment = () => {
//     if (editingId) {
//       // Edit existing appointment
//       setAppointments(
//         appointments.map((apt) =>
//           apt.id === editingId
//             ? ({ ...apt, ...newAppointment } as Appointment)
//             : apt
//         )
//       );
//     } else {
//       // Add new appointment
//       const newApt: Appointment = {
//         id: Math.max(...appointments.map((a) => a.id)) + 1,
//         date: newAppointment.date || "",
//         time: newAppointment.time || "",
//         doctor: newAppointment.doctor || "",
//         type: newAppointment.type || "",
//         status: newAppointment.status || "upcoming",
//       };
//       setAppointments([...appointments, newApt]);
//     }
//     cancelAdd();
//   };

//   const startEdit = (appointment: Appointment) => {
//     setEditingId(appointment.id);
//     setNewAppointment({ ...appointment });
//   };

//   const deleteAppointment = (id: number) => {
//     setAppointments(appointments.filter((apt) => apt.id !== id));
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Appointments
//         </h3>
//         <Button onClick={startAdd}>
//           <Plus className="w-4 h-4 mr-2" />
//           Schedule New Appointment
//         </Button>
//       </div>

//       {/* Add/Edit Form */}
//       {(isAdding || editingId) && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <Label>Date</Label>
//                 <Input
//                   value={newAppointment.date}
//                   onChange={(e) =>
//                     setNewAppointment({
//                       ...newAppointment,
//                       date: e.target.value,
//                     })
//                   }
//                   placeholder="DD MMM YYYY"
//                 />
//               </div>
//               <div>
//                 <Label>Time</Label>
//                 <Input
//                   value={newAppointment.time}
//                   onChange={(e) =>
//                     setNewAppointment({
//                       ...newAppointment,
//                       time: e.target.value,
//                     })
//                   }
//                   placeholder="HH:MM AM/PM"
//                 />
//               </div>
//               <div>
//                 <Label>Doctor</Label>
//                 <Input
//                   value={newAppointment.doctor}
//                   onChange={(e) =>
//                     setNewAppointment({
//                       ...newAppointment,
//                       doctor: e.target.value,
//                     })
//                   }
//                   placeholder="Doctor name"
//                 />
//               </div>
//               <div>
//                 <Label>Type</Label>
//                 <Input
//                   value={newAppointment.type}
//                   onChange={(e) =>
//                     setNewAppointment({
//                       ...newAppointment,
//                       type: e.target.value,
//                     })
//                   }
//                   placeholder="Appointment type"
//                 />
//               </div>
//               <div>
//                 <Label>Status</Label>
//                 <Select
//                   value={newAppointment.status}
//                   onValueChange={(
//                     value: "upcoming" | "completed" | "cancelled"
//                   ) => setNewAppointment({ ...newAppointment, status: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="upcoming">Upcoming</SelectItem>
//                     <SelectItem value="completed">Completed</SelectItem>
//                     <SelectItem value="cancelled">Cancelled</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button onClick={saveAppointment}>
//                 {editingId ? "Update" : "Add"} Appointment
//               </Button>
//               <Button variant="outline" onClick={cancelAdd}>
//                 Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Appointments List */}
//       <div className="space-y-3">
//         {appointments.map((appointment) => (
//           <Card key={appointment.id}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 dark:text-white">
//                       {appointment.date.split(" ")[1]}
//                     </div>
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       {appointment.date.split(" ")[0]}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900 dark:text-white">
//                       {appointment.doctor}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">
//                       {appointment.type} • {appointment.time}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge
//                     variant={
//                       appointment.status === "upcoming"
//                         ? "default"
//                         : "secondary"
//                     }
//                   >
//                     {appointment.status}
//                   </Badge>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => startEdit(appointment)}
//                   >
//                     <Edit3 className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => deleteAppointment(appointment.id)}
//                   >
//                     <Trash2 className="w-4 h-4 text-red-500" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Updated DocumentsContent with editing functionality
// function DocumentsContent({
//   documents,
//   setDocuments,
// }: {
//   documents: Document[];
//   setDocuments: (documents: Document[]) => void;
// }) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [newDocument, setNewDocument] = useState<Partial<Document>>({
//     name: "",
//     date: "",
//     type: "",
//     size: "",
//   });

//   const addDocument = () => {
//     if (newDocument.name && newDocument.date) {
//       const doc: Document = {
//         id: Math.max(...documents.map((d) => d.id)) + 1,
//         name: newDocument.name || "",
//         date: newDocument.date || "",
//         type: newDocument.type || "Document",
//         size: newDocument.size || "0 MB",
//       };
//       setDocuments([...documents, doc]);
//       setNewDocument({ name: "", date: "", type: "", size: "" });
//       setIsAdding(false);
//     }
//   };

//   const deleteDocument = (id: number) => {
//     setDocuments(documents.filter((doc) => doc.id !== id));
//   };

//   const updateDocument = (id: number, field: keyof Document, value: string) => {
//     setDocuments(
//       documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
//     );
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Medical Documents
//         </h3>
//         <Button onClick={() => setIsAdding(true)}>
//           <Upload className="w-4 h-4 mr-2" />
//           Upload Document
//         </Button>
//       </div>

//       {/* Add Document Form */}
//       {isAdding && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <Label>Document Name</Label>
//                 <Input
//                   value={newDocument.name}
//                   onChange={(e) =>
//                     setNewDocument({ ...newDocument, name: e.target.value })
//                   }
//                   placeholder="e.g., Blood Test Results"
//                 />
//               </div>
//               <div>
//                 <Label>Date</Label>
//                 <Input
//                   value={newDocument.date}
//                   onChange={(e) =>
//                     setNewDocument({ ...newDocument, date: e.target.value })
//                   }
//                   placeholder="DD MMM YYYY"
//                 />
//               </div>
//               <div>
//                 <Label>Type</Label>
//                 <Select
//                   value={newDocument.type}
//                   onValueChange={(value) =>
//                     setNewDocument({ ...newDocument, type: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Lab Report">Lab Report</SelectItem>
//                     <SelectItem value="Imaging">Imaging</SelectItem>
//                     <SelectItem value="Prescription">Prescription</SelectItem>
//                     <SelectItem value="Medical Certificate">
//                       Medical Certificate
//                     </SelectItem>
//                     <SelectItem value="Insurance">Insurance</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label>Size</Label>
//                 <Input
//                   value={newDocument.size}
//                   onChange={(e) =>
//                     setNewDocument({ ...newDocument, size: e.target.value })
//                   }
//                   placeholder="e.g., 2.4 MB"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button onClick={addDocument}>Add Document</Button>
//               <Button variant="outline" onClick={() => setIsAdding(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Documents List */}
//       <div className="space-y-3">
//         {documents.map((doc) => (
//           <Card key={doc.id}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3 flex-1">
//                   <FileText className="w-8 h-8 text-blue-600" />
//                   <div className="flex-1">
//                     <Input
//                       value={doc.name}
//                       onChange={(e) =>
//                         updateDocument(doc.id, "name", e.target.value)
//                       }
//                       className="border-none p-0 font-semibold text-gray-900 dark:text-white"
//                     />
//                     <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
//                       <Select
//                         value={doc.type}
//                         onValueChange={(value) =>
//                           updateDocument(doc.id, "type", value)
//                         }
//                       >
//                         <SelectTrigger className="w-32 h-6 text-xs">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Lab Report">Lab Report</SelectItem>
//                           <SelectItem value="Imaging">Imaging</SelectItem>
//                           <SelectItem value="Prescription">
//                             Prescription
//                           </SelectItem>
//                           <SelectItem value="Medical Certificate">
//                             Medical Certificate
//                           </SelectItem>
//                           <SelectItem value="Insurance">Insurance</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <Input
//                         value={doc.date}
//                         onChange={(e) =>
//                           updateDocument(doc.id, "date", e.target.value)
//                         }
//                         className="w-24 h-6 text-xs"
//                       />
//                       <Input
//                         value={doc.size}
//                         onChange={(e) =>
//                           updateDocument(doc.id, "size", e.target.value)
//                         }
//                         className="w-16 h-6 text-xs"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => deleteDocument(doc.id)}
//                 >
//                   <Trash2 className="w-4 h-4 text-red-500" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
