'use client';

import Form from "@components/Form";
import { log } from "console";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetail = async () => {
            const response = await fetch(`/api/prompt/${promptId}`, { method: "GET" });
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if (promptId)
            getPromptDetail();
    }, [promptId]);

    const EditPrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) {
            setSubmitting(false);
            return alert("PromptID not found");
        }
        try {
            const response = await fetch(`/api/prompt/${[promptId]}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={EditPrompt}
        />


    );
};

export default EditPrompt;
