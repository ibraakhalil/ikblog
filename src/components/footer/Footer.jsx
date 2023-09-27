import Link from 'next/link';
import styles from './footer.module.css'
import Image from 'next/image';
import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className="container">
                <div className={styles.social_links}>
                    <ul>
                        <li>
                            <Link href='facebook.com'>
                                <FaFacebookF/>
                            </Link>
                        </li>
                        <li>
                            <Link href='facebook.com'>
                                <FaGithub/>
                            </Link>
                        </li>
                        <li>
                            <Link href='facebook.com'>
                                <FaLinkedin/>
                            </Link>
                        </li>
                        <li>
                            <Link href='facebook.com'>
                                <FaTwitter/>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.nav_links}>
                    <ul>
                        <li>
                            <Link href='/about'>About</Link>
                        </li>
                        <li>
                            <Link href='/blog'>Blog</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Contact</Link>
                        </li>
                        <li>
                            <Link href='/category'>Category</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;