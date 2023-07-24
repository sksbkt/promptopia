import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDb } from '@utils/database'
import User from '@models/user';
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credential",
            credentials: {
                username: { label: "UserName", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (user) {
                    return user;
                } else {
                    return null;
                }

            },
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile, credentials }) {
            try {
                await connectToDb();
                console.log(profile, credentials);

                //? check if user already exists
                const userExists = await User.findOne({ email: profile.email });
                //? if not create the user

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    pages: { signIn: "/auth/credentials-signin" }
});

export { handler as GET, handler as POST };