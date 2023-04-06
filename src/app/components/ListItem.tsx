import Link from 'next/link'
import React from 'react'
import getFormattedDate from '../../../lib/getFormattedDate'

type props = {
    post: BlogPost
}

const ListItem = ({ post }: props) => {
    const { id, title, date } = post
    const formattedDate = getFormattedDate(date)

    return (
        <li className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
}

export default ListItem