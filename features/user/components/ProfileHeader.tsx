'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { MedicalProfile } from "../server/types";
// import { updateMedicalProfile } from "../server/actions";
import { Edit3, Save, X } from "lucide-react";
import { MedicalProfile } from "../types/medical-profile";
import { updateMedicalProfile } from "../actions/actions";

interface ProfileHeaderProps {
  profile: MedicalProfile;
  onUpdate: () => void;
}

export default function ProfileHeader({ profile, onUpdate }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    bloodGroup: profile.bloodGroup || "",
  });

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMedicalProfile(profile.userId, {
        fullName: formData.fullName,
        bloodGroup: formData.bloodGroup,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const age = profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : 0;

  return (
    <div className="flex w-full flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-primary/10">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-28 w-28 -mt-20 border-4 border-white dark:border-gray-800">
          <AvatarImage src={profile.profileImage || ""} alt={profile.fullName || "User"} />
          <AvatarFallback className="text-2xl font-bold bg-primary text-white">
            {(profile.fullName || "U").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          {isEditing ? (
            <div className="flex flex-col gap-2 items-center">
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="text-center text-[22px] font-bold"
                placeholder="Full Name"
              />
              <div className="flex gap-2">
                <Input
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                  className="w-20 text-center"
                  placeholder="Blood Group"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-dark-blue dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                {profile.fullName || "Add Your Name"}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal text-center">
                {age > 0 ? `${age} years old` : "Add Date of Birth"} | {profile.bloodGroup ? `${profile.bloodGroup} Blood Group` : "Add Blood Group"}
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-green-500 hover:bg-green-600"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  fullName: profile.fullName || "",
                  bloodGroup: profile.bloodGroup || "",
                });
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <Button 
            onClick={() => setIsEditing(true)} 
            className="bg-primary/20 text-primary hover:bg-primary/30"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}