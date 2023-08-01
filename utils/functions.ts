import { GetServerSidePropsContext } from "next"
import { getCsrfToken } from "next-auth/react"

export const firstToUpper = (input: string) => {
    return `${input[0].toUpperCase()}${input.slice(1, input.length).toLowerCase()}`
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}