import { connect } from "@/config/database";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                const { email, password } = credentials
                let error = {}

                connect()
                const user = await User.findOne({ email })

                if (!user) {
                    error.email = 'User not found!'
                    throw new Error(JSON.stringify(error))
                }
                if (password !== user.password) {
                    error.password = 'Password not match!'
                    throw new Error(JSON.stringify(error))
                }

                return user;
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub
            }

            return session
        }
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }