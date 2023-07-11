"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState<any>(null);

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setProvider();
    }, []);

    return <nav className="flex justify-between w-full mb-16 pt-3">
        <Link
            href={'/'}
            className="flex gap-2 items-center"
        >
            <Image
                src="/assets/images/logo.svg"
                alt="Proptopia logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>
        {/* //? MOBILE NAVIGATION */}
        <div
            className="sm:flex  hidden"
        >
            {
                isUserLoggedIn ? (<div>
                    <div className="flex gap-2 md:gap-5">
                        <Link
                            href={'/create-prompt'}
                            className="black_btn"
                        >
                            Create post</Link>
                        <button
                            type="button"
                            className="outline_btn">
                            Sign out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src="/assets/images/logo.svg"
                                alt="user profile"
                                width={37}
                                height={37}
                            />
                        </Link>
                    </div>
                </div>) : <>
                    {providers ??
                        Object.values(providers).map((provider: any) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider)}
                                className="black_btn"
                            >
                                Sign in
                            </button>
                        ))
                    }
                </>
            }
        </div>
    </nav>;
};

export default Nav;
