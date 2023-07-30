import { NextResponse, type NextRequest } from 'next/server'


//? for now this is the only way to implement nextjs middleware

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    switch (url.pathname) {
        case '/api/prompt':
            break;

        default:
            break;
    }
}
export const config = {
    matcher: [
        '/api/:path*'
    ],
}