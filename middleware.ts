import { NextResponse, type NextRequest } from 'next/server'


//? for now this is the only way to implement nextjs middleware

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log('middleware', request.nextUrl);
    const url = request.nextUrl;
    switch (url.pathname) {
        case '/api/prompt':
            // console.log(url.searchParams.get('search'));
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