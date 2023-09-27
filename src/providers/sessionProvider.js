'use client'
import { SessionProvider } from "next-auth/react";


const sessionProvider = ({ children }) => {
    return (<SessionProvider>
        {children}
    </SessionProvider>);
}

export default sessionProvider;