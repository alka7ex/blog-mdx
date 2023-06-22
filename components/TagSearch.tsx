'use client';

import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { allBlogs } from "@/.contentlayer/generated";

export interface Props {
    params: {
        Blog: {
            title: string;
            slug: string;
            descriptions: string;
            tags: string[];
            date: string;
            featured: boolean;
            type: string;
            content: string;
            thumbnail: string;
            // Blog: string;  
            data?: any;
            meta?: any;
            body: string;
        }
    }
}



const TagSearch: React.FC<Props> = () => {
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = (searchQuery || '');
    const filteredBlogs = allBlogs.filter((post) => {
        // Implement your filtering logic based on the search query
        // For example, check if the title or tags contain the search query
        const {tags } = post;
        return (
            tags.some((tag) => tag.toLowerCase().includes(encodedSearchQuery))
        );
    });

    return (
        <div>
            <div className="h-auto w-auto mx-auto flex flex-col">
                <div className="container grid grid-cols-1 mx-auto space-y-5 md:grid-cols-2 lg:space-y-0">
                    {filteredBlogs.map((post) => (
                        <div className="flex flex-col">
                            <CardHeader>
                                <Link href={"/blog/" + post.slug}className="container rounded-2xl justify-center">
                                    <Image
                                        src={post.thumbnail}
                                        width={400}
                                        height={300}
                                        alt="Picture of the author"
                                        />
                                </Link>
                            </CardHeader>
                            <CardTitle className="m-6">
                                <Link href={"/blog/" + post.slug}>
                                    <h2 className="card-title">{post.title}</h2>
                                </Link>
                                <div className="flex flex-row"> {/* Wrap the tags in a single div with flex layout */}
                                    {post.tags.map((tag) => (
                                        <div className="flex flex-col md:flex-row mx-max bg-transparent"> {/* Use a single div for each tag */}
                                            <Link href={"/tags?q=" + tag}>
                                                <Button className="justify-start p-1 w-auto h-auto text-xs">
                                                    {tag}
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </CardTitle>
                            <CardContent className="">
                                <div className="h-24 overflow-hidden">{post.descriptions}</div>
                            </CardContent>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default TagSearch;