import Nav from '@components/Nav';
import '@styles/globals.css';
import React from 'react';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI prompts",
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
        </body>

    </html>
        ;
};

export default layout;
