'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";



const PromptCardList = ({
    data,
    handleTagClick,
}: {
    data: any[],
    handleTagClick: any
}) => {
    return <div
        className="mt-16 prompt_layout"
    >
        {data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />))}
    </div>;
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const response = await fetch('api/prompt');
            const data = await response.json();
            setPosts(data);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [searchText])

    return <section
        className="feed"
    >
        <form
            className="relative w-full flex-center"
        >
            <input
                type="text"
                placeholder="Search for a tag or username"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"
            />
        </form>
        <PromptCardList
            data={posts}
            handleTagClick={() => { }}
        />
    </section>;
};

export default Feed;
