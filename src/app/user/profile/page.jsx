import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import styles from './profile.module.css'
import Link from "next/link";
import Blogs from "@/components/blogs/Blogs";
const userPic = 'https://www.leadmeonline.com/wp-content/uploads/2018/04/user-placeholder-man-10-6.jpg'


const page = async () => {
    const { user } = await getServerSession(authOptions)

    return (
        <div className="container">
            {user && <div className="profile">
                <div className={styles.wrapper}>
                    <div className={styles.sidebar}>
                        <ul>
                            <li>
                                <Link href={`/user/create_blog`}>Creat Blog</Link>
                            </li>
                            <li>
                                <Link href={`/`}>Edit Profile</Link>
                            </li>
                            <li>
                                <Link href={`/user/create_blog`}>My Blog Post</Link>
                            </li>
                            <li>
                                <Link href={`/`}>Comments</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.hero}>
                        <div>
                            <div>
                                <h1 className={styles.name}>{user.name}</h1>
                                <p>Fullstack Web developer</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className={styles.profile_pic}>
                                <Image src={userPic} width={500} height={500} alt="ProfilePic" />
                            </div>
                            <div className={styles.follow_buttons}>
                                <p>Follow on</p>
                                <div className={styles.social_links}>
                                    <ul>
                                        <li>
                                            <Link href='facebook.com'>
                                                <FaFacebookF />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='facebook.com'>
                                                <FaGithub />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='facebook.com'>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='facebook.com'>
                                                <FaTwitter />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Blogs/>
            </div>}

        </div>
    );
}

export default page;