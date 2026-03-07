import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://opentreatment.in",
      lastModified: new Date(),
    },
    {
      url: "https://opentreatment.in/auth",
      lastModified: new Date(),
    },
    {
      url: "https://opentreatment.in/user/doctors",
      lastModified: new Date(),
    },
  ];
}