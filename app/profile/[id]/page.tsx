'use client'

import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { firstToUpper } from "@utils/functions";
const MyProfile = ({ params }: { params: { id: string } }) => {

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const getPromptDetail = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`, { method: "GET" });
            const data = await response.json();
            if (data) {
                setPosts(data);
                setUsername(firstToUpper(data[0].creator.username));
            }
        }
        getPromptDetail();
    }, []);

    return <Profile
        name={username}
        desc=""
        data={posts}
    />;
};

export default MyProfile;