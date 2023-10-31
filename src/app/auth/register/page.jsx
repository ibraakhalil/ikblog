'use client'
import style from '../login/page.module.css'
import { useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Register = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const name = useRef('')
    const email = useRef('')
    const password = useRef('')
    const confirmpassword = useRef('')
    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const user = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
        }

        try {
            const res = await axios.post('/api/auth/register', user)

            console.log(res)
            if (res.statusText === 'OK') {
                setIsLoading(false)
                router.push('/auth/login')
            }

        } catch (err) {
            setIsLoading(false)
            const error = err.response.data.error
            setError(error)
        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={style.blog_form}>
                <div className='form_header'>
                    <h1>Registration</h1>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="name">Name:</label>
                    <input ref={name} type="text" name="name" placeholder='Type your Name...' />
                    <div className={style.error_feedback}>
                        {error?.name && <span>{error.name}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="email">Email:</label>
                    <input ref={email} type="email" name="email" placeholder='Type your email...'/>
                    <div className={style.error_feedback}>
                        {error?.email && <span>{error.email}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="password">Password:</label>
                    <input ref={password} type="password" name="password" placeholder='Type your password...'/>
                    <div className={style.error_feedback}>
                        {error?.password && <span>{error.password}</span>}
                    </div>
                </div>
                <div className={style.form_group}>
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input ref={confirmpassword} type="password" name="confirmpassword" placeholder='Type your Confirm password...'/>
                    <div className={style.error_feedback}>
                        {error?.password && <span>{error.password}</span>}
                    </div>
                </div>
                <button className='btn btn_primary' type="submit" disabled={isLoading ? true : false}>
                    {isLoading ? 'Loading..' : 'Registration'}
                </button>
                <div className={style.btm}>
                    Already Have Account?
                    <Link href='login'><span> Login</span></Link>
                </div>
            </form>
        </div>
    );
}

export default Register;