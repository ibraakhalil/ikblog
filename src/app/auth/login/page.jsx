"use client"
import style from './page.module.css'
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react"


const Login = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const email = useRef('')
    const password = useRef('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const user = {
            email: email.current.value,
            password: password.current.value,
            redirect: false,
            callbackUrl: '/'
        }
        const res = await signIn('credentials', user)
        if (res?.error) {
            const error = JSON.parse(res.error)

            setIsLoading(false)
            return setError(error)
        }
        setIsLoading(false)
        router.push(res.url)
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={style.blog_form}>
                <div className={style.form_header}>
                    <h1>Member Login</h1>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="email">Email:</label>
                    <input ref={email} type="email" name="email" placeholder='Type your email...' />
                    <div className={style.error_feedback}>
                        {error?.email && <span>{error.email}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="password">Password:</label>
                    <input ref={password} type="password" name="password" placeholder='Type your password...' />
                    <div className={style.error_feedback}>
                        {error?.password && <span>{error.password}</span>}
                    </div>
                </div>
                <button className='btn btn_primary' type="submit" disabled={isLoading ? true : false}>
                    {isLoading ? 'Loading..' : 'Login'}
                </button>
                <div className={style.btm}>
                    Do not have Account?
                    <Link href='register'>
                        <span> Create Here</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;