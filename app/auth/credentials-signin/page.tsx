'use client'
import LoginButton from "@components/LoginButton";
import { getServerSideProps } from "@utils/functions";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react";


export default async function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {


    const response = await getProviders();


    return (
        Object.values(response).map(provider => {
            if (provider.id === "google") {
                return <LoginButton auth={provider} />;
            } else {

                return (
                    <form
                        className="mt-10 gap-5 grid grid-cols-2"
                        method="post"
                        action="/api/auth/callback/credentials"

                    >
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <label
                            className="flex-1 flex-col flex"
                        >
                            <p
                                className="py-1 px-3 font-semibold text-gray-600">
                                Username</p>
                            <input
                                className="auth_input"
                                name="username"
                                type="text"
                            />
                        </label>
                        <label
                            className="flex-1 flex-col flex"
                        >
                            <p
                                className="py-1 px-3 font-semibold text-gray-600">

                                Password
                            </p>
                            <input
                                className="auth_input"
                                name="password"
                                type="password" />
                        </label>
                        <div
                            className="col-start-2 flex justify-end"
                        >
                            <button
                                className="auth_btn"
                                type="submit"
                            >Sign in</button>
                            {/* //* 
                                //* for now I decided not implement login with username and password
                                //! due to security concerns 
                            */}
                        </div>
                    </form>
                )
            }
        }
        )

    )
}
