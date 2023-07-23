import Link from "next/link";
import React from "react";

const Form = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit,
}: {
    type: 'Create' | 'Edit',
    post: {
        prompt: string, tag: string
    },
    setPost: any,
    submitting: any,
    handleSubmit: any,
}) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1
                className="head_text text-left"
            >
                <span className="blue_gradient">
                    {type} post
                </span>
            </h1>
            <p
                className="desc text-left max-w-md"
            >
                {type} and share amazing prompt with the world and let your imagination run wild with any AI-powered platform.
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label htmlFor="">
                    <span
                        className="font-satoshi font-semibold text-base text-gray-700"
                    >
                        Your AI prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                        id="" cols={30} rows={10}
                    ></textarea>
                </label>
                <label htmlFor="">
                    <span
                        className="font-satoshi font-semibold text-base text-gray-700"
                    >
                        Tag{' '}
                        <span
                            className="font-satoshi font-light text-gray-400"
                        >(#product,#webdevelopment, #idea)</span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder="#tag"
                        required
                        className="form_input"
                    ></input>
                </label>
                <div
                    className="flex-end mx-3 mb-5 gap-4"
                >
                    <Link
                        href='/'
                        className="text-gray-400 text-sm hover:text-gray-900 transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 bg-primary-orange rounded-full text-white hover:bg-orange-500 transition-all"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
