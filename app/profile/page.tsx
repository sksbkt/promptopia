'use client'

import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const MyProfile = () => {
    const { data: session } = useSession();
    const id = session?.user.id
        // ! PRODUCTION
        ?? '64b4f1aaed3a13de39605b66';
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${id}/posts`);
            const data = await response.json();
            setPosts(data);
        };
        if (id)
            fetchPosts();
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
                const filteredPosts = posts.filter(p => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);

            }
        }
    }

    return <Profile
        name="My"
        desc="welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />;
};

export default MyProfile;