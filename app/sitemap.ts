import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const SITE_URL = "https://opentreatment.in";

function withSite(path: string) {
  return `${SITE_URL}${path}`;
}

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/blog",
  "/user/doctors",
  "/user/hospitals",
  "/user/pharmacy",
  "/user/labs",
  
] as const;

const EXPLORE_SLUGS = [
  "medicine-pricing",
  "diagnostic-tests",
  "hospital-bills",
  "surgery-packages",
  "cost-comparison",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    ...STATIC_PUBLIC_ROUTES.map((route) => ({
      url: withSite(route),
      lastModified: now,
    })),
    ...EXPLORE_SLUGS.map((slug) => ({
      url: withSite(`/user/explore/${slug}`),
      lastModified: now,
    })),
  ];

  const enableDynamicSitemap = process.env.ENABLE_DYNAMIC_SITEMAP === "1";
  if (!enableDynamicSitemap) {
    return staticEntries;
  }

  try {
    const settled = await Promise.allSettled([
      prisma.blog.findMany({ select: { id: true, updatedAt: true } }),
      prisma.independentDoctor.findMany({
        where: { status: "APPROVED" },
        select: { id: true, updatedAt: true },
      }),
      prisma.hospital.findMany({
        where: { status: "APPROVED" },
        select: { id: true, updatedAt: true },
      }),
      prisma.pharmacy.findMany({
        where: { status: "APPROVED" },
        select: { id: true, updatedAt: true },
      }),
      prisma.labCompany.findMany({
        where: { status: "APPROVED", isActive: true },
        select: { id: true, updatedAt: true },
      }),
    ]);

    const blogs = settled[0].status === "fulfilled" ? settled[0].value : [];
    const doctors = settled[1].status === "fulfilled" ? settled[1].value : [];
    const hospitals = settled[2].status === "fulfilled" ? settled[2].value : [];
    const pharmacies = settled[3].status === "fulfilled" ? settled[3].value : [];
    const labs = settled[4].status === "fulfilled" ? settled[4].value : [];

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...blogs.map((blog) => ({
        url: withSite(`/blog/${blog.id}`),
        lastModified: blog.updatedAt ?? now,
      })),
      ...doctors.map((doctor) => ({
        url: withSite(`/user/doctors/${doctor.id}`),
        lastModified: doctor.updatedAt ?? now,
      })),
      ...hospitals.map((hospital) => ({
        url: withSite(`/user/hospitals/${hospital.id}`),
        lastModified: hospital.updatedAt ?? now,
      })),
      ...pharmacies.map((pharmacy) => ({
        url: withSite(`/user/pharmacy/${pharmacy.id}`),
        lastModified: pharmacy.updatedAt ?? now,
      })),
      ...labs.map((lab) => ({
        url: withSite(`/user/labs/${lab.id}`),
        lastModified: lab.updatedAt ?? now,
      })),
    ];

    return [...staticEntries, ...dynamicEntries];
  } catch (error) {
    return staticEntries;
  }
}
