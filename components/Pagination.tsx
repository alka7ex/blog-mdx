"use client";

import { dataPagination } from '@/app/api/fetch';
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BlogListWithPagination from './BlogList';
import Pagebutton from './Pagebutton3';

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


// kalau di video youtube
// pagination itu hanya tombol paginationnya aja
// produtlist itu sama kayak bloglist
// products itu kayak page.tsx dari page2, tapi kita ga pengen page2 jadi client side makannya
// ditaro di pagination


const queryClient = new QueryClient()


const Pagination = async () => {
  const [page, setpage] = React.useState(0)

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const jsonData = await dataPagination();
      return jsonData;
    },
    keepPreviousData: true
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;

  }

  return (
    <div>
        <BlogListWithPagination></BlogListWithPagination>
        <div className='flex item-center justify-between my-5'>
          <Pagebutton></Pagebutton>
        </div>
    </div>
  )
}

const PaginationBlog = () => (
  <QueryClientProvider client={queryClient}>
    <Pagination />
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);

export default PaginationBlog;