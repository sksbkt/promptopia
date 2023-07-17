'use client';

import Form from "@components/Form";
import { log } from "console";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const CreatePrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('api/prompt/new', {
                method: 'POST',
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
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={CreatePrompt}
        />


    );
};

export default CreatePrompt;
