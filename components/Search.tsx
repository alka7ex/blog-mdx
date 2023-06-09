"use client";

import React, { useState } from 'react'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
    }
    return (
        <form onSubmit={onSearch}>
            <div className="">
                <Input
                    type="text"
                    placeholder="Search article"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                >
                </Input>
            </div>
        </form>
    )
}

export default Search
