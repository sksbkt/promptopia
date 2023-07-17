import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import React from 'react';
import { get } from './api/auth/[...nextauth]/route';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI prompts",
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return <html lang="en">
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>

    </html>
        ;
};

export default layout;
