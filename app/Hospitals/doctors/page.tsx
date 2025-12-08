"use client";

import React, { useEffect, useState } from "react";
import HospitalDoctorList from "@/features/panel/hospitals/hospital-doctors/components/HospitalDoctorList";
import HospitalDoctorForm from "@/features/panel/hospitals/hospital-doctors/components/HospitalDoctorForm";
import { HospitalDoctor } from "@/features/panel/hospitals/hospital-doctors/types/hospitalDoctor";
import { addHospitalDoctor, deleteHospitalDoctor, getHospitalDoctors, updateHospitalDoctor } from "@/features/panel/hospitals/hospital-doctors/actions/hospitalDoctorActions";
import Image from "next/image";
import Link from "next/link";

const HospitalDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<HospitalDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<HospitalDoctor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  // Fetch doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getHospitalDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate doctors
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Add / Update handler
  const handleFormSubmit = async (doctorData: Omit<HospitalDoctor, "id">) => {
    try {
      if (selectedDoctor) {
        // Update
        await updateHospitalDoctor(selectedDoctor.id, doctorData);
      } else {
        // Add
        await addHospitalDoctor(doctorData);
      }
      setShowForm(false);
      setSelectedDoctor(null);
      fetchDoctors(); // Refresh list
    } catch (err) {
      console.error("Failed to save doctor:", err);
    }
  };

  // Edit handler
  const handleEdit = (doctor: HospitalDoctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteHospitalDoctor(id);
        fetchDoctors(); // Refresh list
      } catch (err) {
        console.error("Failed to delete doctor:", err);
      }
    }
  };

  // Sample doctor data for UI (you can replace with your actual data)
  const sampleDoctors = [
    {
      id: "1",
      name: "Dr. Evelyn Reed",
      specialization: "Cardiology",
      experience: "15 years",
      status: "ACTIVE",
      profilePic: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNUamuY9i8zNxsFUBblQV-nxBBtkohOz-dwZbqnz0GGQ8HOW-sT7u35aiKx8I-vNQWIojrw9bcEXqvo8EDh1NDarTTs6RA3SOfCX3aDYLDOB7o6nTP3KnSno_qUXmcsmGuw9bBLzCU0DXf0EnxWiZJJQFmAlN7_BYZBE0gsr7YipaIDwDNyftaWl8sGF0vaZ93gxINiZfyBvuBUtjRUkO8TY7xpBMw6HI3vx3BNwlZgiaFi37HFzFbpxxc9aSibGTWA3JQF5L2V-Y"
    },
    {
      id: "2",
      name: "Dr. Marcus Thorne",
      specialization: "Neurology",
      experience: "12 years",
      status: "ACTIVE",
      profilePic: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVxgyRfGKRLU0w0uCla04XD-QISdY-7d9yIcIyNi74Q1-17Lo7pfGh_Q8Qw4Nw4-0AnaSdtI1Waj2PmfwpbU0txtxY1lwTCFbLb0JMbewH_gecKGrS_-cupClCdsgaO0cy310XSn8eNJ73rkOdjLHmIdfj1j-GDi-NDzAPNDQvDNOz49gd5Wod4ApPEKoeSW9p2fsloB1pzNwi0YA4qxhVozcx0Cy9_kF19JBnTHwqclpfVkCVifgVzAQdmAllW4VgEX4vGKdg02s"
    },
    {
      id: "3",
      name: "Dr. Julian Cross",
      specialization: "Orthopedics",
      experience: "8 years",
      status: "ON_LEAVE",
      profilePic: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvjt62F9th4ieJ77qT1UaKVF1OcI7rX6Yva5lyDkatkmDCoBzpH_LTnJVyGI3d0KzX0ojBW0dLpVmpo3B0YSa3U8iXdjWNniY92nzfpVFW3Ba7VRB3WwELb23ysubBZccFaqJYHcj3_oPLkBfkY_HOFFcaFvvNCZOdpsqXs6uVE2UFocsFfO_ABSH_6QLnUazZdPXdPCoqb1Ovij9V5oh4UR5eGiLLbgnw3YUtB58TjfKir18psR0eEzEFEASEcEZYZbuCcTSJk4E"
    },
    {
      id: "4",
      name: "Dr. Anya Sharma",
      specialization: "Pediatrics",
      experience: "10 years",
      status: "INACTIVE",
      profilePic: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2AeGT-Vs-I2gYu3sThtxneX5Fh_KgE8fpkIM2VLVEv4A0ncoVth8extnhhZQyO4cLaKmPXlsaNj2o6IR2z12q8MgjufUX9mxzWlgDfRWa0x65TnVFeMFo4szSy9Igi3wiKvcC6Jc6btAOhMrMPwN93qzslnXSKuxc3Hsujx1gKjxKwk_c8QggzBkUT-oglJtGVYG7dv8Rf5qaD94svoVwdg4m1IDYnckgpk87YT34U-cTALJPcv796y68ac46KyAiecb9L0rz9sA"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300">
            <span className="size-2 rounded-full bg-green-500"></span>
            Active
          </span>
        );
      case "ON_LEAVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-3 py-1 text-sm font-medium text-yellow-700 dark:text-yellow-300">
            <span className="size-2 rounded-full bg-yellow-500"></span>
            On Leave
          </span>
        );
      case "INACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-3 py-1 text-sm font-medium text-red-700 dark:text-red-300">
            <span className="size-2 rounded-full bg-red-500"></span>
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex w-full min-h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      {/* Glow Effects */}
      <div className="glow-effect glow-top-left"></div>
      <div className="glow-effect glow-bottom-right"></div>

      {/* NavigationDrawer (Sidebar) */}
      <aside className="hidden lg:flex w-64 flex-col gap-4 bg-component-light/80 dark:bg-component-dark/80 backdrop-blur-sm p-4 border-r border-border-light dark:border-border-dark">
        <div className="flex items-center gap-3 h-16 px-2">
          <div className="flex items-center justify-center size-10 bg-primary/20 rounded-lg">
            <span className="material-symbols-outlined text-primary text-2xl">local_hospital</span>
          </div>
          <h1 className="text-xl font-bold text-text-light dark:text-text-dark">CarePlus</h1>
        </div>
        <ul className="flex flex-col gap-2 flex-1">
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">dashboard</span>
            <p className="text-base font-semibold truncate">Dashboard</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">domain</span>
            <p className="text-base font-semibold truncate">Hospital Profile</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 bg-primary/20 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-2xl">groups</span>
            <p className="text-primary text-base font-bold truncate">Doctors</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">biotech</span>
            <p className="text-base font-semibold truncate">Procedures</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">medical_services</span>
            <p className="text-base font-semibold truncate">Services</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">apartment</span>
            <p className="text-base font-semibold truncate">Facilities</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">credit_card</span>
            <p className="text-base font-semibold truncate">Insurance</p>
          </li>
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">verified</span>
            <p className="text-base font-semibold truncate">Approval Status</p>
          </li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className="flex h-12 items-center gap-4 rounded-lg px-4 cursor-pointer hover:bg-primary/10">
            <span className="material-symbols-outlined text-text-light dark:text-text-dark/80 text-2xl">settings</span>
            <p className="text-base font-semibold truncate">Settings</p>
          </li>
        </ul>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* TopAppBar */}
        <header className="flex h-20 items-center justify-between bg-component-light/80 dark:bg-component-dark/80 backdrop-blur-sm px-6 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden text-text-light dark:text-text-dark">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            {/* SearchBar */}
            <label className="hidden sm:flex flex-col min-w-40 h-12 w-full max-w-md">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-primary flex border-none bg-primary/20 items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-primary/20 focus:border-none h-full placeholder:text-primary/70 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  placeholder="Search doctors, specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-primary/10">
              <span className="material-symbols-outlined text-2xl text-text-light dark:text-text-dark">notifications</span>
            </button>
            <Image
              width={48}
              height={48}
              className="size-12 rounded-full object-cover border-2 border-primary/50"
              alt="User avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHw4snDRMNSglGBYgrEO3gP-vcMIqJB8Jmvpn5ApbxU6XnyB8su06m6_hJmYEZxQtcMcHERoJTrLqoJuDLCwijZ9NQiPR8isoPHn-4-eVBFy9opFxl9RK3_3xAMBjoA-6eF-hdMaVEUoE24DZK6Ayk9YvwkUTpBbqIa4BGuKdzBbec1ij9s8BVbSvzqtGXz5SJAXV-jhwBorvLPtPf8cZfqM5Mc9c6s_ibS3jKREISui1x7kreiW47b8Hrssvw9m0NTMK4xuTxf6I"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-text-light dark:text-text-dark text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em]">
              Doctors Management
            </h2>
            <button
              onClick={() => {
                setSelectedDoctor(null);
                setShowForm(true);
              }}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">add</span>
              <span className="truncate">Add Doctor</span>
            </button>
          </div>

          {/* Doctors Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Loading doctors...</p>
            </div>
          ) : (
            <div className="bg-component-light/80 dark:bg-component-dark/80 backdrop-blur-sm rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-border-light dark:border-border-dark">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-text-light/70 dark:text-text-dark/70 uppercase tracking-wider">
                        Doctor Name
                      </th>
                      <th className="p-4 text-sm font-semibold text-text-light/70 dark:text-text-dark/70 uppercase tracking-wider">
                        Specialization
                      </th>
                      <th className="p-4 text-sm font-semibold text-text-light/70 dark:text-text-dark/70 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="p-4 text-sm font-semibold text-text-light/70 dark:text-text-dark/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-sm font-semibold text-text-light/70 dark:text-text-dark/70 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {paginatedDoctors.length > 0 ? (
                      paginatedDoctors.map((doctor) => (
                        <tr key={doctor.id} className="hover:bg-primary/5 dark:hover:bg-primary/10">
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <Image
                                width={40}
                                height={40}
                                className="size-10 rounded-full object-cover"
                                alt={doctor.name}
                                src={doctor.profilePic || "/default-avatar.png"}
                              />
                              <p className="font-semibold">{doctor.name}</p>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">{doctor.specialization}</td>
                          <td className="p-4 whitespace-nowrap">{doctor.experience}</td>
                          <td className="p-4 whitespace-nowrap">
                            {getStatusBadge(doctor.status)}
                          </td>
                          <td className="p-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleEdit(doctor)}
                              className="p-2 rounded-md hover:bg-primary/20"
                            >
                              <span className="material-symbols-outlined text-xl">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(doctor.id)}
                              className="p-2 rounded-md hover:bg-red-500/20"
                            >
                              <span className="material-symbols-outlined text-xl text-red-500">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-text-light/70 dark:text-text-dark/70">
                          No doctors found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between p-4 border-t border-border-light dark:border-border-dark">
                <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredDoctors.length)} of {filteredDoctors.length} results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-9 w-9 rounded-md border border-border-light dark:border-border-dark hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`flex items-center justify-center h-9 w-9 rounded-md ${currentPage === index + 1 ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-9 w-9 rounded-md border border-border-light dark:border-border-dark hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Doctor Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-component-light dark:bg-component-dark rounded-xl w-full max-w-lg m-4 shadow-2xl border border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
              <h3 className="text-xl font-bold">
                {selectedDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedDoctor(null);
                }}
                className="p-2 rounded-full hover:bg-primary/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <HospitalDoctorForm
                doctor={selectedDoctor || undefined}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedDoctor(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDoctorsPage;