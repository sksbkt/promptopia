'use client'

import { useSession } from "next-auth/react";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useState } from "react";

export const PromptCard = ({
    post,
    handleTagClick,
    handleImgClick,
    handleEdit,
    handleDelete,
}: {
    post: any,
    handleTagClick?: (tag) => void,
    handleImgClick?: (id) => void,
    handleEdit?: () => void,
    handleDelete?: () => void,

}) => {

    const { data: session } = useSession();
    const id = session?.user.id
        // ! PRODUCTION
        ?? process.env.PRODUCTION_GOOGLE_USER_ID;

    const pathName = usePathname();

    const [copied, setCopied] = useState('');

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopied('');
        }, 3000);
    }
    // console.log('ID', { id, PostID: post.creator._id })

    return <div
        className="prompt_card"
    >
        <div
            className="flex flex-justify-between items-start gap-5"
        >
            <div
                className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
            >
                <Image
                    alt={post.creator.username}
                    src={post.creator.image}
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                    onClick={() => handleImgClick(post.creator._id)}
                />
                <div
                    className="flex flex-col"
                >
                    <h3
                        className="font-satoshi font-semibold text-gray-900"
                    >
                        {post.creator.username}
                    </h3>
                    <p
                        className="font-inter text-sm text-gray-500"
                    >
                        {post.creator.email}
                    </p>
                </div>
            </div>
            <div
                className="copy_btn"
                onClick={handleCopy}
            >
                <Image
                    src={
                        copied === post.prompt ?
                            '/assets/icons/tick.svg' :
                            '/assets/icons/copy.svg'
                    }
                    alt={
                        copied === post.prompt ?
                            'Copy this prompt' :
                            'copy'
                    }
                    width={12}
                    height={12}
                />
            </div>
        </div>
        <p
            className="my-4 font-satoshi text-sm text-gray-700"
        >
            {post.prompt}
        </p>
        <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick(post.tag)}
        >#{post.tag}</p>
        {
            id === post.creator._id &&
            pathName === '/profile' &&
            (
                <div
                    className="mt-5 flex-start gap-4 border-t border-x-gray-200 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )
        }
    </div>
}