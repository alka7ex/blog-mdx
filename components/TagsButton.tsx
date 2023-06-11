"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import React, { useEffect, useState } from 'react'
import { get } from 'http';
import { getEnvironmentData } from 'worker_threads';


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
            const response = await fetch (process.env.NEXT_PUBLIC_STRAPI_URL +
            "/api/tags?")
            const data = await response.json();
            setSearchQuery(data);
        }
        getData()
    }, [])
    console.log("result",searchQuery)
    const router = useRouter();
    const handleClick = (tag : string) => {
        router.push(`/tags?q=${tag}`);
    };
    return (
        <Button
            onClick={() => handleClick(data[0].attributes.tags.name_tag)}
            variant="ghost"
        >
            {data[0].attributes.tags.name_tag}
        </Button>
    )
}


export default TagsButton
