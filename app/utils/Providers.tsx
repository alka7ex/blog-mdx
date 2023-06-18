'use client';

import BlogListWithPagination from '@/components/BlogList'
import Featured from '@/components/Featured'
import HydratedBlogList from '@/components/HydratedBlogList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'


export interface Props {
    data: PropsDatum[];
    meta: Meta;
    slug: string;
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


const Providers = async ({ data,meta }) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Featured data={data} meta={meta}></Featured>
            <HydratedBlogList></HydratedBlogList>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default Providers