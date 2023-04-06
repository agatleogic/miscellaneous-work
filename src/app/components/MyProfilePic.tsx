import Image from 'next/image'
import React from 'react'

const MyProfilePic = () => {
  return (
    <section className='w-full mx-auto'>
        <Image src={`/images/raman.png`} className='border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8' width={200} height={200} alt='raman nagar profile-photo' priority ></Image>
    </section>
  )
}

export default MyProfilePic