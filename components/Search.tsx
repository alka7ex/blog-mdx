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
        setSearchQuery(''); // Reset searchQuery to an empty string
    }
    return (
        <form onSubmit={onSearch}>
            <div className="text-foreground">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                >
                </Input>
            </div>
        </form>
    )
}

export default Search
