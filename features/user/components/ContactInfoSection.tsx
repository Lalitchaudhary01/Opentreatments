'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { MedicalProfile } from "../server/types";
// import { updateMedicalProfile } from "../server/actions";
import { Phone, ChevronDown, Edit3, Save, X, MapPin, Heart } from "lucide-react";
import { MedicalProfile } from "../types/medical-profile";
import { updateMedicalProfile } from "../actions/actions";

interface ContactInfoSectionProps {
  profile: MedicalProfile;
  onUpdate: () => void;
}

export default function ContactInfoSection({ profile, onUpdate }: ContactInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: profile.phone || "",
    address: {
      street: profile.address?.street || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
      pincode: profile.address?.pincode || "",
      country: profile.address?.country || "India",
    },
    emergencyContact: {
      name: profile.emergencyContact?.name || "",
      phone: profile.emergencyContact?.phone || "",
      relation: profile.emergencyContact?.relation || "",
    }
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMedicalProfile(profile.userId, {
        phone: formData.phone,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm shadow-primary/5">
      <CardContent className="p-0">
        <div className="flex justify-between items-center px-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-1 cursor-pointer items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <p className="text-dark-blue dark:text-white text-base font-bold">Contact Information</p>
            </div>
            <ChevronDown className={`h-5 w-5 text-dark-blue dark:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="ml-4">
              <Edit3 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-1 ml-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSave} 
                disabled={loading}
                className="text-green-600"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    phone: profile.phone || "",
                    address: {
                      street: profile.address?.street || "",
                      city: profile.address?.city || "",
                      state: profile.address?.state || "",
                      pincode: profile.address?.pincode || "",
                      country: profile.address?.country || "India",
                    },
                    emergencyContact: {
                      name: profile.emergencyContact?.name || "",
                      phone: profile.emergencyContact?.phone || "",
                      relation: profile.emergencyContact?.relation || "",
                    }
                  });
                }} 
                className="text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {isOpen && (
          <div className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed pb-4 space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4 px-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Address</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Street"
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, street: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="City"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, city: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="State"
                      value={formData.address.state}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, state: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Pincode"
                      value={formData.address.pincode}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, pincode: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Country"
                      value={formData.address.country}
                      onChange={(e) => setFormData({
                        ...formData, 
                        address: {...formData.address, country: e.target.value}
                      })}
                      className="col-span-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Heart className="h-4 w-4" /> Emergency Contact</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Name"
                      value={formData.emergencyContact.name}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {...formData.emergencyContact, name: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Phone"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {...formData.emergencyContact, phone: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Relation"
                      value={formData.emergencyContact.relation}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {...formData.emergencyContact, relation: e.target.value}
                      })}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
                <p><strong>Address:</strong> {profile.address ? 
                  `${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.pincode}, ${profile.address.country}` 
                  : "Not provided"}</p>
                <p><strong>Emergency Contact:</strong> {profile.emergencyContact ? 
                  `${profile.emergencyContact.name} (${profile.emergencyContact.relation}) - ${profile.emergencyContact.phone}` 
                  : "Not provided"}</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}