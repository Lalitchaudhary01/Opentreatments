-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DOCTOR', 'HOSPITAL', 'PHARMACY', 'INSURANCE_COMPANY');

-- CreateEnum
CREATE TYPE "HospitalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PharmacyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('INCOMING', 'OUTGOING');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PACKED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InventoryChangeType" AS ENUM ('SALE', 'DAMAGE', 'EXPIRE', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "DoctorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('CONSULTATION_REQUEST', 'CONSULTATION_STATUS', 'ADMIN_APPROVAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "InsuranceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LabStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'TECHNICIAN_ASSIGNED', 'SAMPLE_COLLECTED', 'SAMPLE_RECEIVED', 'PROCESSING', 'REPORT_READY', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "SampleStatus" AS ENUM ('PENDING', 'SCHEDULED', 'COLLECTED', 'RECEIVED', 'REJECTED', 'PROCESSING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'GENERATING', 'READY', 'VERIFIED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "PrescriptionStatus" AS ENUM ('PENDING', 'VERIFIED', 'CLARIFICATION', 'REJECTED', 'DISPENSED');

-- CreateEnum
CREATE TYPE "SalePaymentMethod" AS ENUM ('CASH', 'UPI', 'CARD', 'CREDIT');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('COMPLETED', 'CANCELLED', 'REFUNDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "phone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "address" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "bloodGroup" TEXT,
    "conditions" TEXT[],
    "allergies" TEXT[],
    "medications" JSONB,
    "pastSurgeries" TEXT[],
    "familyHistory" TEXT[],
    "appointments" JSONB,
    "smokingStatus" TEXT,
    "alcoholConsumption" TEXT,
    "dietType" TEXT,
    "sleepHours" INTEGER,
    "activityLevel" TEXT,
    "waterIntake" INTEGER,
    "stressLevel" TEXT,
    "healthScore" INTEGER,
    "lastVisit" TIMESTAMP(3),
    "nextAppointment" TIMESTAMP(3),
    "primaryDoctor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTag" (
    "blogId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("blogId","tagId")
);

-- CreateTable
CREATE TABLE "HospitalProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "image" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "HospitalStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,

    CONSTRAINT "HospitalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "description" TEXT,
    "hospitalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalFacility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hospitalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalInsurance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT,
    "cashless" BOOLEAN NOT NULL DEFAULT false,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "HospitalInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalDoctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "experience" INTEGER,
    "profilePic" TEXT,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "HospitalDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalProcedure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION,
    "duration" TEXT,
    "hospitalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HospitalProcedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePolicy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT,
    "policyNumber" TEXT,
    "sumInsured" DOUBLE PRECISION NOT NULL,
    "deductible" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coPay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "cashless" BOOLEAN NOT NULL DEFAULT false,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverageEstimate" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "procedureCost" DOUBLE PRECISION NOT NULL,
    "coveredAmount" DOUBLE PRECISION NOT NULL,
    "outOfPocket" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoverageEstimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "gstNumber" TEXT,
    "licenseNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "status" "PharmacyStatus" NOT NULL DEFAULT 'PENDING',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PharmacyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyMedicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genericName" TEXT,
    "strength" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "pharmacyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" TEXT,
    "category" TEXT,
    "dosageForm" TEXT,
    "gst" DOUBLE PRECISION,
    "manufacturer" TEXT,
    "mrp" DOUBLE PRECISION,

    CONSTRAINT "PharmacyMedicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyStockEntry" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "purchasePrice" DOUBLE PRECISION,
    "sellingPrice" DOUBLE PRECISION,
    "type" "StockType" NOT NULL DEFAULT 'INCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pharmacyId" TEXT NOT NULL,

    CONSTRAINT "PharmacyStockEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyInventoryLog" (
    "id" TEXT NOT NULL,
    "stockEntryId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "changeType" "InventoryChangeType" NOT NULL,
    "quantityChanged" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyInventoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyOrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PharmacyOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyPriceTrend" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PharmacyPriceTrend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacySubstitute" (
    "id" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "substituteMedicineId" TEXT NOT NULL,

    CONSTRAINT "PharmacySubstitute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacySettings" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "billingPrefix" TEXT NOT NULL DEFAULT 'INV',
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 20,
    "enableUPI" BOOLEAN NOT NULL DEFAULT true,
    "roundOffBills" BOOLEAN NOT NULL DEFAULT false,
    "allowSubstitutes" BOOLEAN NOT NULL DEFAULT true,
    "requireRxForScheduleH" BOOLEAN NOT NULL DEFAULT true,
    "sendOrderSms" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyOffer" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "minOrderValue" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyCustomer" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "notes" TEXT,
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "totalSpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastOrderAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyPrescription" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "customerId" TEXT,
    "orderId" TEXT,
    "rxNumber" TEXT NOT NULL,
    "status" "PrescriptionStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "notes" TEXT,
    "imageUrl" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyPrescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyDeliveryConfig" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "homeDeliveryOn" BOOLEAN NOT NULL DEFAULT false,
    "maxRadiusKm" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "baseFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "freeAboveAmount" DOUBLE PRECISION,
    "avgEtaMins" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyDeliveryConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyBranch" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacyBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacySale" (
    "id" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "customerId" TEXT,
    "invoiceNumber" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "SalePaymentMethod" NOT NULL DEFAULT 'CASH',
    "status" "SaleStatus" NOT NULL DEFAULT 'COMPLETED',
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PharmacySale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacySaleItem" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "medicineId" TEXT,
    "medicineName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "lineTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PharmacySaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialties" TEXT[],
    "specialization" TEXT NOT NULL,
    "experience" INTEGER,
    "gender" TEXT,
    "profilePic" TEXT,
    "fees" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "languages" TEXT[],
    "availability" JSONB,
    "badges" TEXT[],
    "city" TEXT,
    "status" "DoctorStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorServiceProfile" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "availability" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT true,
    "maxSlots" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorServiceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorConsultation" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slot" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'PENDING',
    "mode" TEXT NOT NULL DEFAULT 'online',
    "fee" DOUBLE PRECISION,
    "paymentId" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
    "notes" TEXT,
    "prescription" TEXT,
    "cancelReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorOfflineConsultation" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER,
    "patientGender" TEXT,
    "phoneNumber" TEXT,
    "complaint" TEXT NOT NULL,
    "prescription" TEXT,
    "followUpDate" TIMESTAMP(3),
    "visitTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorOfflineConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorReview" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoctorReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "labBookingId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "provider" TEXT,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAction" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCompany" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactPhone" TEXT,
    "registrationNumber" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "provider" TEXT,
    "profile" JSONB,
    "address" TEXT,
    "website" TEXT,
    "status" "InsuranceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverageDetails" JSONB NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coverageAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "billDetails" JSONB NOT NULL,
    "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "website" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "description" TEXT,
    "accreditations" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "licenseNumber" TEXT,
    "licenseExpiry" TIMESTAMP(3),
    "homeCollection" BOOLEAN NOT NULL DEFAULT false,
    "homeCollectionFee" INTEGER,
    "collectionCenters" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "status" "LabStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTestCatalog" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "sampleType" TEXT,
    "volume" TEXT,
    "container" TEXT,
    "method" TEXT,
    "fastingRequired" BOOLEAN NOT NULL DEFAULT false,
    "fastingHours" INTEGER,
    "preparation" TEXT,
    "price" INTEGER NOT NULL,
    "discountedPrice" INTEGER,
    "tatHours" INTEGER,
    "parameters" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isHomeCollection" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTestCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabPackageCatalog" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDesc" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "popularFor" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "samplesRequired" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" INTEGER NOT NULL,
    "discountedPrice" INTEGER,
    "discountPercent" DOUBLE PRECISION,
    "fastingRequired" BOOLEAN NOT NULL DEFAULT false,
    "reportTat" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabPackageCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabPackageTestMap" (
    "packageId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,

    CONSTRAINT "LabPackageTestMap_pkey" PRIMARY KEY ("packageId","testId")
);

-- CreateTable
CREATE TABLE "LabCollectionSlot" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabCollectionSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTechnicianProfile" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "employeeId" TEXT,
    "designation" TEXT NOT NULL,
    "specialization" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "experience" INTEGER,
    "qualification" TEXT,
    "certificates" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTechnicianProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTechnicianScheduleSlot" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTechnicianScheduleSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTechnicianAssignmentMap" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "assignmentDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'assigned',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTechnicianAssignmentMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabBookingOrder" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testId" TEXT,
    "packageId" TEXT,
    "subtotal" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "homeCollectionFee" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "appointmentSlot" TEXT NOT NULL,
    "collectionType" TEXT NOT NULL,
    "collectionCenter" TEXT,
    "patientName" TEXT NOT NULL,
    "patientAge" INTEGER NOT NULL,
    "patientGender" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "patientEmail" TEXT,
    "address" TEXT,
    "city" TEXT,
    "pincode" TEXT,
    "landmark" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "sampleStatus" "SampleStatus" NOT NULL DEFAULT 'PENDING',
    "reportStatus" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "sampleCollectedAt" TIMESTAMP(3),
    "sampleReceivedAt" TIMESTAMP(3),
    "reportGeneratedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancelReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabBookingOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabBookingOrderItem" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "testId" TEXT,
    "packageId" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabBookingOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabBookingTimelineEvent" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabBookingTimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabDiagnosticReport" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "reportUrl" TEXT,
    "summaryUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "reportData" JSONB,
    "parameters" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "generatedAt" TIMESTAMP(3),
    "downloadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabDiagnosticReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTestPriceHistory" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "oldPrice" INTEGER NOT NULL,
    "newPrice" INTEGER NOT NULL,
    "changedBy" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabTestPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabAdminNote" (
    "id" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabAdminNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isVerified_idx" ON "User"("isVerified");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expires_idx" ON "Session"("expires");

-- CreateIndex
CREATE INDEX "Blog_createdAt_idx" ON "Blog"("createdAt");

-- CreateIndex
CREATE INDEX "Blog_authorId_createdAt_idx" ON "Blog"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_blogId_createdAt_idx" ON "Comment"("blogId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_blogId_userId_key" ON "Like"("blogId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "BlogTag_tagId_idx" ON "BlogTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalProfile_slug_key" ON "HospitalProfile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "HospitalProfile_userId_key" ON "HospitalProfile"("userId");

-- CreateIndex
CREATE INDEX "HospitalProfile_status_createdAt_idx" ON "HospitalProfile"("status", "createdAt");

-- CreateIndex
CREATE INDEX "HospitalProfile_city_idx" ON "HospitalProfile"("city");

-- CreateIndex
CREATE INDEX "HospitalProfile_name_idx" ON "HospitalProfile"("name");

-- CreateIndex
CREATE INDEX "HospitalService_hospitalId_createdAt_idx" ON "HospitalService"("hospitalId", "createdAt");

-- CreateIndex
CREATE INDEX "HospitalFacility_hospitalId_createdAt_idx" ON "HospitalFacility"("hospitalId", "createdAt");

-- CreateIndex
CREATE INDEX "HospitalInsurance_hospitalId_idx" ON "HospitalInsurance"("hospitalId");

-- CreateIndex
CREATE INDEX "HospitalDoctor_hospitalId_specialization_idx" ON "HospitalDoctor"("hospitalId", "specialization");

-- CreateIndex
CREATE INDEX "HospitalProcedure_hospitalId_createdAt_idx" ON "HospitalProcedure"("hospitalId", "createdAt");

-- CreateIndex
CREATE INDEX "InsurancePolicy_userId_createdAt_idx" ON "InsurancePolicy"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "CoverageEstimate_hospitalId_createdAt_idx" ON "CoverageEstimate"("hospitalId", "createdAt");

-- CreateIndex
CREATE INDEX "CoverageEstimate_policyId_idx" ON "CoverageEstimate"("policyId");

-- CreateIndex
CREATE INDEX "CoverageEstimate_procedureId_idx" ON "CoverageEstimate"("procedureId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyProfile_userId_key" ON "PharmacyProfile"("userId");

-- CreateIndex
CREATE INDEX "PharmacyProfile_status_createdAt_idx" ON "PharmacyProfile"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyProfile_city_idx" ON "PharmacyProfile"("city");

-- CreateIndex
CREATE INDEX "PharmacyMedicine_pharmacyId_createdAt_idx" ON "PharmacyMedicine"("pharmacyId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyMedicine_pharmacyId_name_idx" ON "PharmacyMedicine"("pharmacyId", "name");

-- CreateIndex
CREATE INDEX "PharmacyMedicine_pharmacyId_genericName_idx" ON "PharmacyMedicine"("pharmacyId", "genericName");

-- CreateIndex
CREATE INDEX "PharmacyStockEntry_pharmacyId_createdAt_idx" ON "PharmacyStockEntry"("pharmacyId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyStockEntry_medicineId_idx" ON "PharmacyStockEntry"("medicineId");

-- CreateIndex
CREATE INDEX "PharmacyStockEntry_pharmacyId_expiryDate_idx" ON "PharmacyStockEntry"("pharmacyId", "expiryDate");

-- CreateIndex
CREATE INDEX "PharmacyInventoryLog_pharmacyId_createdAt_idx" ON "PharmacyInventoryLog"("pharmacyId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyInventoryLog_stockEntryId_createdAt_idx" ON "PharmacyInventoryLog"("stockEntryId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyInventoryLog_medicineId_createdAt_idx" ON "PharmacyInventoryLog"("medicineId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyOrder_userId_createdAt_idx" ON "PharmacyOrder"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyOrder_pharmacyId_createdAt_idx" ON "PharmacyOrder"("pharmacyId", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyOrder_status_createdAt_idx" ON "PharmacyOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyOrderItem_orderId_idx" ON "PharmacyOrderItem"("orderId");

-- CreateIndex
CREATE INDEX "PharmacyOrderItem_medicineId_idx" ON "PharmacyOrderItem"("medicineId");

-- CreateIndex
CREATE INDEX "PharmacyPriceTrend_medicineId_date_idx" ON "PharmacyPriceTrend"("medicineId", "date");

-- CreateIndex
CREATE INDEX "PharmacySubstitute_medicineId_idx" ON "PharmacySubstitute"("medicineId");

-- CreateIndex
CREATE INDEX "PharmacySubstitute_substituteMedicineId_idx" ON "PharmacySubstitute"("substituteMedicineId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacySettings_pharmacyId_key" ON "PharmacySettings"("pharmacyId");

-- CreateIndex
CREATE INDEX "PharmacySettings_pharmacyId_idx" ON "PharmacySettings"("pharmacyId");

-- CreateIndex
CREATE INDEX "PharmacyOffer_pharmacyId_isActive_createdAt_idx" ON "PharmacyOffer"("pharmacyId", "isActive", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyCustomer_pharmacyId_createdAt_idx" ON "PharmacyCustomer"("pharmacyId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyCustomer_pharmacyId_phone_key" ON "PharmacyCustomer"("pharmacyId", "phone");

-- CreateIndex
CREATE INDEX "PharmacyPrescription_pharmacyId_status_createdAt_idx" ON "PharmacyPrescription"("pharmacyId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "PharmacyPrescription_customerId_createdAt_idx" ON "PharmacyPrescription"("customerId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyDeliveryConfig_pharmacyId_key" ON "PharmacyDeliveryConfig"("pharmacyId");

-- CreateIndex
CREATE INDEX "PharmacyBranch_pharmacyId_isActive_createdAt_idx" ON "PharmacyBranch"("pharmacyId", "isActive", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacySale_invoiceNumber_key" ON "PharmacySale"("invoiceNumber");

-- CreateIndex
CREATE INDEX "PharmacySale_pharmacyId_soldAt_idx" ON "PharmacySale"("pharmacyId", "soldAt");

-- CreateIndex
CREATE INDEX "PharmacySale_pharmacyId_status_soldAt_idx" ON "PharmacySale"("pharmacyId", "status", "soldAt");

-- CreateIndex
CREATE INDEX "PharmacySaleItem_saleId_idx" ON "PharmacySaleItem"("saleId");

-- CreateIndex
CREATE INDEX "PharmacySaleItem_medicineId_idx" ON "PharmacySaleItem"("medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_userId_key" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE INDEX "DoctorProfile_status_createdAt_idx" ON "DoctorProfile"("status", "createdAt");

-- CreateIndex
CREATE INDEX "DoctorProfile_city_idx" ON "DoctorProfile"("city");

-- CreateIndex
CREATE INDEX "DoctorProfile_specialization_idx" ON "DoctorProfile"("specialization");

-- CreateIndex
CREATE INDEX "DoctorServiceProfile_doctorId_idx" ON "DoctorServiceProfile"("doctorId");

-- CreateIndex
CREATE INDEX "DoctorServiceProfile_doctorId_createdAt_idx" ON "DoctorServiceProfile"("doctorId", "createdAt");

-- CreateIndex
CREATE INDEX "DoctorServiceProfile_doctorId_isActive_idx" ON "DoctorServiceProfile"("doctorId", "isActive");

-- CreateIndex
CREATE INDEX "DoctorServiceProfile_doctorId_category_idx" ON "DoctorServiceProfile"("doctorId", "category");

-- CreateIndex
CREATE INDEX "DoctorServiceProfile_doctorId_isOnline_idx" ON "DoctorServiceProfile"("doctorId", "isOnline");

-- CreateIndex
CREATE INDEX "DoctorConsultation_doctorId_slot_idx" ON "DoctorConsultation"("doctorId", "slot");

-- CreateIndex
CREATE INDEX "DoctorConsultation_doctorId_status_slot_idx" ON "DoctorConsultation"("doctorId", "status", "slot");

-- CreateIndex
CREATE INDEX "DoctorConsultation_userId_createdAt_idx" ON "DoctorConsultation"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "DoctorOfflineConsultation_doctorId_visitTime_idx" ON "DoctorOfflineConsultation"("doctorId", "visitTime");

-- CreateIndex
CREATE INDEX "DoctorOfflineConsultation_doctorId_createdAt_idx" ON "DoctorOfflineConsultation"("doctorId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorReview_consultationId_key" ON "DoctorReview"("consultationId");

-- CreateIndex
CREATE INDEX "DoctorReview_doctorId_createdAt_idx" ON "DoctorReview"("doctorId", "createdAt");

-- CreateIndex
CREATE INDEX "DoctorReview_userId_idx" ON "DoctorReview"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_createdAt_idx" ON "Notification"("userId", "isRead", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_consultationId_key" ON "Payment"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_labBookingId_key" ON "Payment"("labBookingId");

-- CreateIndex
CREATE INDEX "Payment_status_createdAt_idx" ON "Payment"("status", "createdAt");

-- CreateIndex
CREATE INDEX "AdminAction_adminId_createdAt_idx" ON "AdminAction"("adminId", "createdAt");

-- CreateIndex
CREATE INDEX "AdminAction_targetType_targetId_idx" ON "AdminAction"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_userId_key" ON "InsuranceCompany"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_email_key" ON "InsuranceCompany"("email");

-- CreateIndex
CREATE INDEX "InsuranceCompany_status_createdAt_idx" ON "InsuranceCompany"("status", "createdAt");

-- CreateIndex
CREATE INDEX "InsuranceCompany_name_idx" ON "InsuranceCompany"("name");

-- CreateIndex
CREATE INDEX "Plan_companyId_createdAt_idx" ON "Plan"("companyId", "createdAt");

-- CreateIndex
CREATE INDEX "Plan_name_idx" ON "Plan"("name");

-- CreateIndex
CREATE INDEX "Claim_companyId_status_createdAt_idx" ON "Claim"("companyId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Claim_userId_createdAt_idx" ON "Claim"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Claim_planId_createdAt_idx" ON "Claim"("planId", "createdAt");

-- CreateIndex
CREATE INDEX "Claim_status_createdAt_idx" ON "Claim"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LabProfile_userId_key" ON "LabProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LabProfile_slug_key" ON "LabProfile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LabProfile_email_key" ON "LabProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LabProfile_phone_key" ON "LabProfile"("phone");

-- CreateIndex
CREATE INDEX "LabProfile_status_idx" ON "LabProfile"("status");

-- CreateIndex
CREATE INDEX "LabProfile_city_idx" ON "LabProfile"("city");

-- CreateIndex
CREATE INDEX "LabProfile_slug_idx" ON "LabProfile"("slug");

-- CreateIndex
CREATE INDEX "LabTestCatalog_labId_isActive_idx" ON "LabTestCatalog"("labId", "isActive");

-- CreateIndex
CREATE INDEX "LabTestCatalog_category_idx" ON "LabTestCatalog"("category");

-- CreateIndex
CREATE UNIQUE INDEX "LabTestCatalog_labId_code_key" ON "LabTestCatalog"("labId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "LabTestCatalog_labId_name_key" ON "LabTestCatalog"("labId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "LabPackageCatalog_slug_key" ON "LabPackageCatalog"("slug");

-- CreateIndex
CREATE INDEX "LabPackageCatalog_labId_isActive_idx" ON "LabPackageCatalog"("labId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "LabPackageCatalog_labId_slug_key" ON "LabPackageCatalog"("labId", "slug");

-- CreateIndex
CREATE INDEX "LabPackageTestMap_testId_idx" ON "LabPackageTestMap"("testId");

-- CreateIndex
CREATE INDEX "LabCollectionSlot_labId_idx" ON "LabCollectionSlot"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "LabTechnicianProfile_email_key" ON "LabTechnicianProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LabTechnicianProfile_phone_key" ON "LabTechnicianProfile"("phone");

-- CreateIndex
CREATE INDEX "LabTechnicianProfile_labId_idx" ON "LabTechnicianProfile"("labId");

-- CreateIndex
CREATE INDEX "LabTechnicianScheduleSlot_technicianId_idx" ON "LabTechnicianScheduleSlot"("technicianId");

-- CreateIndex
CREATE UNIQUE INDEX "LabTechnicianAssignmentMap_bookingId_key" ON "LabTechnicianAssignmentMap"("bookingId");

-- CreateIndex
CREATE INDEX "LabTechnicianAssignmentMap_technicianId_idx" ON "LabTechnicianAssignmentMap"("technicianId");

-- CreateIndex
CREATE UNIQUE INDEX "LabBookingOrder_bookingNumber_key" ON "LabBookingOrder"("bookingNumber");

-- CreateIndex
CREATE INDEX "LabBookingOrder_labId_status_idx" ON "LabBookingOrder"("labId", "status");

-- CreateIndex
CREATE INDEX "LabBookingOrder_userId_status_idx" ON "LabBookingOrder"("userId", "status");

-- CreateIndex
CREATE INDEX "LabBookingOrder_bookingNumber_idx" ON "LabBookingOrder"("bookingNumber");

-- CreateIndex
CREATE INDEX "LabBookingOrder_appointmentDate_idx" ON "LabBookingOrder"("appointmentDate");

-- CreateIndex
CREATE INDEX "LabBookingOrderItem_bookingId_idx" ON "LabBookingOrderItem"("bookingId");

-- CreateIndex
CREATE INDEX "LabBookingTimelineEvent_bookingId_idx" ON "LabBookingTimelineEvent"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "LabDiagnosticReport_bookingId_key" ON "LabDiagnosticReport"("bookingId");

-- CreateIndex
CREATE INDEX "LabDiagnosticReport_labId_status_idx" ON "LabDiagnosticReport"("labId", "status");

-- CreateIndex
CREATE INDEX "LabTestPriceHistory_testId_idx" ON "LabTestPriceHistory"("testId");

-- CreateIndex
CREATE INDEX "LabAdminNote_labId_idx" ON "LabAdminNote"("labId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProfile" ADD CONSTRAINT "HospitalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalService" ADD CONSTRAINT "HospitalService_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalFacility" ADD CONSTRAINT "HospitalFacility_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalInsurance" ADD CONSTRAINT "HospitalInsurance_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalDoctor" ADD CONSTRAINT "HospitalDoctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalProcedure" ADD CONSTRAINT "HospitalProcedure_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageEstimate" ADD CONSTRAINT "CoverageEstimate_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageEstimate" ADD CONSTRAINT "CoverageEstimate_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "InsurancePolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageEstimate" ADD CONSTRAINT "CoverageEstimate_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "HospitalProcedure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyProfile" ADD CONSTRAINT "PharmacyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyMedicine" ADD CONSTRAINT "PharmacyMedicine_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyStockEntry" ADD CONSTRAINT "PharmacyStockEntry_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyStockEntry" ADD CONSTRAINT "PharmacyStockEntry_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyInventoryLog" ADD CONSTRAINT "PharmacyInventoryLog_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyInventoryLog" ADD CONSTRAINT "PharmacyInventoryLog_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyInventoryLog" ADD CONSTRAINT "PharmacyInventoryLog_stockEntryId_fkey" FOREIGN KEY ("stockEntryId") REFERENCES "PharmacyStockEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOrder" ADD CONSTRAINT "PharmacyOrder_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOrder" ADD CONSTRAINT "PharmacyOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOrderItem" ADD CONSTRAINT "PharmacyOrderItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOrderItem" ADD CONSTRAINT "PharmacyOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PharmacyOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyPriceTrend" ADD CONSTRAINT "PharmacyPriceTrend_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySubstitute" ADD CONSTRAINT "PharmacySubstitute_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySubstitute" ADD CONSTRAINT "PharmacySubstitute_substituteMedicineId_fkey" FOREIGN KEY ("substituteMedicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySettings" ADD CONSTRAINT "PharmacySettings_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyOffer" ADD CONSTRAINT "PharmacyOffer_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyCustomer" ADD CONSTRAINT "PharmacyCustomer_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyPrescription" ADD CONSTRAINT "PharmacyPrescription_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyPrescription" ADD CONSTRAINT "PharmacyPrescription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "PharmacyCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyDeliveryConfig" ADD CONSTRAINT "PharmacyDeliveryConfig_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacyBranch" ADD CONSTRAINT "PharmacyBranch_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySale" ADD CONSTRAINT "PharmacySale_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "PharmacyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySale" ADD CONSTRAINT "PharmacySale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "PharmacyCustomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySaleItem" ADD CONSTRAINT "PharmacySaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "PharmacySale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PharmacySaleItem" ADD CONSTRAINT "PharmacySaleItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "PharmacyMedicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorProfile" ADD CONSTRAINT "DoctorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorServiceProfile" ADD CONSTRAINT "DoctorServiceProfile_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorConsultation" ADD CONSTRAINT "DoctorConsultation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorConsultation" ADD CONSTRAINT "DoctorConsultation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorOfflineConsultation" ADD CONSTRAINT "DoctorOfflineConsultation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorReview" ADD CONSTRAINT "DoctorReview_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "DoctorConsultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorReview" ADD CONSTRAINT "DoctorReview_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorReview" ADD CONSTRAINT "DoctorReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "DoctorConsultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_labBookingId_fkey" FOREIGN KEY ("labBookingId") REFERENCES "LabBookingOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAction" ADD CONSTRAINT "AdminAction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceCompany" ADD CONSTRAINT "InsuranceCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabProfile" ADD CONSTRAINT "LabProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTestCatalog" ADD CONSTRAINT "LabTestCatalog_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabPackageCatalog" ADD CONSTRAINT "LabPackageCatalog_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabPackageTestMap" ADD CONSTRAINT "LabPackageTestMap_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "LabPackageCatalog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabPackageTestMap" ADD CONSTRAINT "LabPackageTestMap_testId_fkey" FOREIGN KEY ("testId") REFERENCES "LabTestCatalog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabCollectionSlot" ADD CONSTRAINT "LabCollectionSlot_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnicianProfile" ADD CONSTRAINT "LabTechnicianProfile_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnicianScheduleSlot" ADD CONSTRAINT "LabTechnicianScheduleSlot_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "LabTechnicianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnicianAssignmentMap" ADD CONSTRAINT "LabTechnicianAssignmentMap_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "LabTechnicianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTechnicianAssignmentMap" ADD CONSTRAINT "LabTechnicianAssignmentMap_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "LabBookingOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrder" ADD CONSTRAINT "LabBookingOrder_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrder" ADD CONSTRAINT "LabBookingOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrder" ADD CONSTRAINT "LabBookingOrder_testId_fkey" FOREIGN KEY ("testId") REFERENCES "LabTestCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrder" ADD CONSTRAINT "LabBookingOrder_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "LabPackageCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrderItem" ADD CONSTRAINT "LabBookingOrderItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "LabBookingOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrderItem" ADD CONSTRAINT "LabBookingOrderItem_testId_fkey" FOREIGN KEY ("testId") REFERENCES "LabTestCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingOrderItem" ADD CONSTRAINT "LabBookingOrderItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "LabPackageCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabBookingTimelineEvent" ADD CONSTRAINT "LabBookingTimelineEvent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "LabBookingOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDiagnosticReport" ADD CONSTRAINT "LabDiagnosticReport_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "LabBookingOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDiagnosticReport" ADD CONSTRAINT "LabDiagnosticReport_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTestPriceHistory" ADD CONSTRAINT "LabTestPriceHistory_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTestPriceHistory" ADD CONSTRAINT "LabTestPriceHistory_testId_fkey" FOREIGN KEY ("testId") REFERENCES "LabTestCatalog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabAdminNote" ADD CONSTRAINT "LabAdminNote_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabAdminNote" ADD CONSTRAINT "LabAdminNote_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

