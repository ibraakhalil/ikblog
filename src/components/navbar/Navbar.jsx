'use client'
import Link from 'next/link';
import style from './navbar.module.css'
import { signOut, useSession } from 'next-auth/react';
import { AiOutlinePoweroff } from 'react-icons/ai'


const Navbar = () => {
    const session = useSession()
    const data = session.data
    const isLoading = session.status === 'loading'


    const handleLogout = (e) => {
        signOut()
    }

    return (<>
        <nav className={style.navbar}>
            <div className="container">
                <div className={style.wrapper}>
                    <div className={style.logo}>
                        <Link href='/'>IKBLOG</Link>
                    </div>
                    {isLoading && <ul>Loading...</ul>}
                    {!isLoading && <ul className={style.links}>
                        <li>
                            <Link href="/blog">Blogs</Link>
                        </li>
                        {!data && <>
                            <li>
                                <Link href="/auth/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/auth/register">Register</Link>
                            </li>
                        </>}
                        {data && <>
                            <li>
                                <Link href="/user/profile">Profile</Link>
                            </li>
                            <li>
                                <button className={style.logout} onClick={handleLogout}>
                                    <AiOutlinePoweroff />
                                </button>
                            </li>
                        </>}
                    </ul>}
                </div>
            </div>
        </nav>
    </>
    );
}

export default Navbar;