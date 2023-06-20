import qs from 'qs';
import { useSearchParams } from 'next/navigation'

export interface Props {
  data: PropsDatum[];
  meta: Meta;
}

export interface PropsDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  title: string;
  slug: string;
  content: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  altthumbnail: string;
  descriptions: null | string;
  thumbnail: Thumbnail;
  tags: Propstags;
}

export interface Thumbnail {
  data: ThumbnailDatum[];
}

export interface ThumbnailDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null | string;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface UpperPrpos {
  props: Props;
}

export interface Propstags {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name_tag: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ResumeData {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  bio:        string;
  experience: string;
  skills:     string;
  tools:      string;
  education:  string;
  course:     string;
  createdAt:  Date;
  updatedAt:  Date;
  summary:    string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}



export async function dataFeatured(): Promise<Props> {
  const query = qs.stringify({
    filters: {
      featured: { $eq: true }
    },
    populate: ["tags", "thumbnail"],
  },);
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + `/api/posts?${query}`
  );
  const jsonData = await res.json();
  return jsonData;
}

export function dataFeatured2(): Promise<Props> {
  const query = qs.stringify({
    filters: {
      featured: { $eq: true }
    },
    populate: ["tags", "thumbnail"],
  },);
  const res = fetch(process.env.NEXT_PUBLIC_STRAPI_URL +
    `/api/posts?${query}`)
    .then((res) => res.json());
  const jsonData = res;
  return jsonData;
}




export async function dataBloglist(): Promise<Props> {
  const query = qs.stringify({
    pagination: {
      pageSize: 10
    },
    sort: ["createdAt:desc"],
    populate: ["tags"],
  },);
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + `/api/posts?${query}`
  );
  if (!res.ok) {
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  }
  const jsonData = await res.json();
  console.log("data bloglist", jsonData);
  return jsonData;
}

export async function tagSearchdata(): Promise<Props> {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const query = qs.stringify({
    filters: {
      tags: {
        name_tag: { $contains: encodedSearchQuery }
      }
    },
    populate: ["tags", "thumbnail"],
  },);
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + `/api/posts?${query}`);
  const jsonData = await res.json();
  return jsonData;
}


export async function normalSearchdata(): Promise<Props> {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    `/api/posts?populate=*&filters[$or][0][title][$contains]=${encodedSearchQuery}&filters[$or][1][slug][$contains]=${encodedSearchQuery}&filters[$or][2][content][$contains]=${encodedSearchQuery}&filters[$or][3][altthumbnail][$contains]=${encodedSearchQuery}&filters[$or][4][descriptions][$contains]=${encodedSearchQuery}`);
  const jsonData = await res.json();
  console.log("data searchpage", jsonData)
  return jsonData;
}

export async function normalSearchdata2(): Promise<Props> {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const query = qs.stringify({
    filters: {
      $or: [
        {
          title: {
            $contains: encodedSearchQuery,
          },
        },
        {
          slug: {
            $contains: encodedSearchQuery,
          },
        },
        {
          content: {
            $contains: encodedSearchQuery,
          },
        },
        {
          altthumbnail: {
            $contains: encodedSearchQuery,
          },
        },
        {
          descriptions: {
            $contains: encodedSearchQuery,
          },
        },
      ],
      populate: ["tags", "thumbnail"],
    },
  },
  );
  const jsonData = await res.json();
  return jsonData;
}

// PAGINATION BLOCK
export async function dataPagination(): Promise<Props> {
  const pageSize = 3
  const pageNumber = 1
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&pagination[page]="+{pageNumber}+"&pagination[pageSize]="+{pageSize}+"&sort=createdAt:desc"
  );
  const jsonData = await res.json();
  console.log("jsonData", jsonData);
  return jsonData;
}

export async function dataBlog(slug: string): Promise<Props> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&filters[slug][$eq]=" +
    slug
  );

  
  const jsonData = await res.json();
  return jsonData;
}

export async function dataHeaderresume(): Promise<ResumeData> {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/resumes");
  const jsonData = await res.json();
  return jsonData;
}

export const fetchTagsData = async (): Promise<Props> => {
  const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/tags?");
  const data = await response.json();
  return data;
};

export const dataPagination2 = async (): Promise<Props> => {
  const query = qs.stringify({
    populate: ["tags", "thumbnail"],
    sort: ['createdAt'],
  },);
  return fetch(process.env.NEXT_PUBLIC_STRAPI_URL +
    `/api/posts?${query}`)
    .then((res) => res.json());
};
