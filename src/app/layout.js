import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import SessionProvider from '../providers/sessionProvider'
import axios from 'axios'
import BlogProvider from '@/context/BlogContext'

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export const metadata = { 
  title: 'IK Blog',
  description: 'Blog site which created by Ibrahim Khalil',
}


export default function RootLayout({ props, children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
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