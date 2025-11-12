// src/features/medical-profile/server/actions.ts
'use server';

import prisma from '@/lib/prisma';
// import { MedicalProfile, MedicalProfileUpdate, HealthRecord } from './types';
import { revalidatePath } from 'next/cache';
import { HealthRecord, MedicalProfile, MedicalProfileUpdate } from '../types/medical-profile';

export async function getMedicalProfile(userId: string): Promise<MedicalProfile> {
  try {
    console.log('🔍 Fetching medical profile for user:', userId);
    
    // Test database connection first
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      throw new Error('Database connection failed. Please check your database configuration.');
    }

    // Check if MedicalProfile table exists
    let profile;
    try {
      profile = await prisma.medicalProfile.findUnique({
        where: { userId },
        include: {
          healthRecords: {
            orderBy: { uploadDate: 'desc' }
          },
          address: true,
          emergencyContact: true,
        },
      });
    } catch (tableError: any) {
      console.error('❌ MedicalProfile table error:', tableError);
      
      // If table doesn't exist, create it via migration
      if (tableError.code === 'P2021' || tableError.message?.includes('does not exist')) {
        throw new Error('MedicalProfile table not found. Please run database migrations.');
      }
      throw tableError;
    }

    if (profile) {
      console.log('✅ Profile found in database');
      const formattedProfile = {
        ...profile,
        dateOfBirth: profile.dateOfBirth?.toISOString() || null,
        policyExpiry: profile.policyExpiry?.toISOString() || null,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString(),
      };
      return formattedProfile;
    }

    // Create new profile if not exists
    console.log('🆕 Creating new medical profile in database...');
    return await createMedicalProfile(userId);
    
  } catch (error: any) {
    console.error('❌ Error in getMedicalProfile:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    // Provide specific error messages
    if (error.code === 'P1001') {
      throw new Error('Cannot connect to database server. Please check your DATABASE_URL.');
    } else if (error.code === 'P1017') {
      throw new Error('Database server closed the connection.');
    } else if (error.message.includes('table not found')) {
      throw new Error('Database tables not found. Please run: npx prisma migrate dev');
    } else {
      throw new Error(`Failed to fetch medical profile: ${error.message}`);
    }
  }
}

async function createMedicalProfile(userId: string): Promise<MedicalProfile> {
  try {
    console.log('🆕 Creating new medical profile for user:', userId);
    
    const profile = await prisma.medicalProfile.create({
      data: {
        userId,
        allergies: [],
        chronicDiseases: [],
        medications: [],
        surgeries: [],
        familyHistory: [],
      },
      include: {
        healthRecords: true,
        address: true,
        emergencyContact: true,
      },
    });

    const formattedProfile = {
      ...profile,
      dateOfBirth: profile.dateOfBirth?.toISOString() || null,
      policyExpiry: profile.policyExpiry?.toISOString() || null,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };

    console.log('✅ New medical profile created successfully');
    return formattedProfile;
  } catch (error: any) {
    console.error('❌ Error creating medical profile:', error);
    throw new Error(`Failed to create medical profile: ${error.message}`);
  }
}

export async function updateMedicalProfile(
  userId: string, 
  updates: MedicalProfileUpdate
): Promise<MedicalProfile> {
  try {
    console.log('📝 Updating medical profile for user:', userId);
    
    const {
      address,
      emergencyContact,
      dateOfBirth,
      policyExpiry,
      ...profileUpdates
    } = updates;

    // Convert string dates to Date objects
    const processedUpdates: any = { ...profileUpdates };
    
    if (dateOfBirth) {
      processedUpdates.dateOfBirth = new Date(dateOfBirth);
    }
    if (policyExpiry) {
      processedUpdates.policyExpiry = new Date(policyExpiry);
    }

    // Update main profile
    const profile = await prisma.medicalProfile.upsert({
      where: { userId },
      update: processedUpdates,
      create: {
        userId,
        ...processedUpdates,
        allergies: updates.allergies || [],
        chronicDiseases: updates.chronicDiseases || [],
        medications: updates.medications || [],
        surgeries: updates.surgeries || [],
        familyHistory: updates.familyHistory || [],
      },
      include: {
        healthRecords: true,
        address: true,
        emergencyContact: true,
      },
    });

    // Update address if provided
    if (address) {
      await prisma.address.upsert({
        where: { userId },
        update: address,
        create: {
          userId,
          ...address,
        },
      });
    }

    // Update emergency contact if provided
    if (emergencyContact) {
      await prisma.emergencyContact.upsert({
        where: { userId },
        update: emergencyContact,
        create: {
          userId,
          ...emergencyContact,
        },
      });
    }

    // Re-fetch to get updated relations
    const updatedProfile = await getMedicalProfile(userId);
    
    revalidatePath('/medical-profile');
    console.log('✅ Profile updated successfully');
    return updatedProfile;
    
  } catch (error: any) {
    console.error('❌ Error updating medical profile:', error);
    throw new Error(`Failed to update medical profile: ${error.message}`);
  }
}

// Other functions remain the same...
export async function uploadHealthRecord(
  userId: string,
  fileData: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
  }
): Promise<HealthRecord> {
  try {
    // First get or create medical profile
    let medicalProfile = await prisma.medicalProfile.findUnique({
      where: { userId },
    });

    if (!medicalProfile) {
      medicalProfile = await prisma.medicalProfile.create({
        data: { userId },
      });
    }

    const record = await prisma.healthRecord.create({
      data: {
        medicalProfileId: medicalProfile.id,
        ...fileData,
      },
    });

    revalidatePath('/medical-profile');
    return {
      ...record,
      uploadDate: record.uploadDate.toISOString(),
    };
  } catch (error: any) {
    console.error('Error uploading health record:', error);
    throw new Error(`Failed to upload health record: ${error.message}`);
  }
}

export async function deleteHealthRecord(recordId: string): Promise<void> {
  try {
    await prisma.healthRecord.delete({
      where: { id: recordId },
    });

    revalidatePath('/medical-profile');
  } catch (error: any) {
    console.error('Error deleting health record:', error);
    throw new Error(`Failed to delete health record: ${error.message}`);
  }
}