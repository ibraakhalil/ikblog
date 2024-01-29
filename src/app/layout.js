import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import SessionProvider from '../providers/sessionProvider'
import axios from 'axios'
import BlogProvider from '@/context/BlogContext'
import Head from 'next/head'

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export const metadata = { 
  title: 'IK Blog',
  description: 'Blog site which created by Ibrahim Khalil',
  icons: {
    icon: [`/favicon.ico?v=4`]
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head><link rel="icon" href="/src/app/favicon.ico" sizes="any" /></Head>
      <body className={poppins.className}>
        <SessionProvider>
          <BlogProvider>
            <Navbar />{children} <Footer />
          </BlogProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export const GetServerSideProps = async () => {
  const res = await axios.get('/api/blog')
  const blogs = res.data

  return {
    props: {
      data: blogs
    }
  }
}