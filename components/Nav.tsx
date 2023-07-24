"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    // const isUserLoggedIn = true;

    const [providers, setProviders] = useState<any>(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);


    useEffect(() => {
        const setUpProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setUpProvider();
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
                // isUserLoggedIn 
                session?.user
                    ? (<div>
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
                                    // src="/assets/images/logo.svg"
                                    className="rounded-full cursor-pointer hover:opacity-60 transition-all"
                                    src={session?.user.image}
                                    alt="user profile"
                                    width={37}
                                    height={37}
                                />
                            </Link>
                        </div>
                    </div>) : <>
                        {providers
                            &&
                            // ! there is no reason to keep this iteration function here since we wont have more than one button to navigate to the actual auth/login page
                            //     Object.values(providers).map((provider: any) => (
                            <button
                                type="button"
                                key={providers.name}
                                onClick={() => signIn(providers)}
                                className="black_btn"
                            >
                                Sign in
                            </button>
                            // )
                            // )
                        }
                    </>
            }
        </div>
        {/* Mobile navigation */}
        <div className="sm:hidden flex relative">
            {
                // isUserLoggedIn
                session?.user
                    ?
                    <div className="flex">
                        <Image
                            // src="/assets/images/logo.svg"
                            src={session?.user.image}
                            className="rounded-full cursor-pointer hover:opacity-60 transition-all"
                            alt="user profile"
                            width={37}
                            height={37}
                            onClick={
                                //? not the best way to change state
                                // () => setToggleDropDown(!toggleDropDown)
                                () => { setToggleDropDown(prev => !prev) }
                            }
                        />
                        {
                            toggleDropDown && <div className="dropdown">
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My profile
                                </Link>
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create promote
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign out
                                </button>
                            </div>
                        }
                    </div> : <>
                        {providers &&
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
