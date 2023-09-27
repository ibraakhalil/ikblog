import Image from 'next/image'
import styles from './page.module.css'
import Recent_blog from '@/components/recent_blog/Recent_blog'

export default function Home() {
  return (
    <div className="container">
      <div className={styles.home}>
        <div className={styles.wrapper}>
          <p>A Personal <span>Blog</span></p>
          <h1 className={styles.hero_text}>I<span>KBLO</span>G</h1>
        </div>
      </div>
      <Recent_blog />
    </div>
  )
}
