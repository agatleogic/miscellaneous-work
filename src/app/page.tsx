import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Posts from './components/Posts'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} px-6 mx-auto`}>
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m
          <span className="font-bold"> Raman</span>
        </span>
      </p>
      <Posts />
      <div className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
        <p className='float-right'>
          <Link href="/feedback">Feedback →</Link>
        </p>
      </div>
    </main>
  )
}
