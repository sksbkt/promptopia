import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    //? in typescript some variables are not defined by default so we need to add them here
    interface Session {
        user: {
            /** The user's postal address. */
            id: string,
            email: string,
            image: string
        }
    }
    interface Profile {
        picture: string,

    }
}