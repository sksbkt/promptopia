'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";
import PromptCard_skeleton from "./skeleton/PromptCard-skeleton";

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
    const [loading, setLoading] = useState(false);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.value[0] === '#') {
            console.log('its a tag');
        } else {
            console.log('search query');
        }

        setSearchText(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(async () => {
            const response = (await fetch(`api/prompt${searchText ? '?search=' + searchText : ''}`));
            const data = await response.json();
            setLoading(false);
            setPosts(data);
        }, 500);
        console.log(posts);
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
        {loading ?
            <PromptCard_skeleton />
            :
            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        }
    </section>;
};

export default Feed;
