import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://farhienza-haikal.my.id',
      lastModified: new Date(),
    },
    {
      url: 'https://farhienza-haikal.my.id/resume',
      lastModified: new Date(),
    },
    {
      url: 'https://farhienza-haikal.my.id/search?q=',
      lastModified: new Date(),
    },
    {
      url: 'https://farhienza-haikal.my.id/tags?q=',
      lastModified: new Date(),
    },
  ]
}