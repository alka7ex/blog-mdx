"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import React, { useEffect, useState } from 'react'
import { get } from 'http';
import { getEnvironmentData } from 'worker_threads';
import { fetchTagsData } from '@/app/api/fetch';




export interface Props {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    name_tag:  string;
    createdAt: Date;
    updatedAt: Date;
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


export const TagsButton = () => {
    const [searchQuery, setSearchQuery] = useState([]);
    useEffect(() => {
        async function getData(){
            const data = await fetchTagsData();
            setSearchQuery(data);
        }
        getData()
    }, [])
    const router = useRouter();
    const handleClick = (tag : string) => {
        router.push(`/tags?q=${tag}`);
    };
    return (
        <Button
            onClick={() => handleClick(data[0].attributes.tags.name_tag)}
            variant="link"
        >
            {data[0].attributes.tags.name_tag}
        </Button>
    )
}


export default TagsButton
