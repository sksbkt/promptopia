"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
    return (
        <button
            type="button"
            className="auth_btn"
            onClick={() => signIn(auth?.id || "")}
        >
            {auth ? `Sign In with ${auth.name}` : "Login"}
        </button>
    );
}