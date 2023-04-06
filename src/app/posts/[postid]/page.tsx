import React from 'react'
import { getPostData, getSortedPostData } from '../../../../lib/post';
import { notFound } from 'next/navigation';
import getFormattedDate from '../../../../lib/getFormattedDate';
import Link from 'next/link';

export function generateStaticParams() {
    const posts = getSortedPostData(); //deduped

    return posts.map((post) => {
        return {
            postid: post.id,
        }
    })
}

export const generateMetadata = ({ params }: { params: { postid: string } }) => {
    const posts = getSortedPostData(); //deduped
    const { postid } = params;

    const post = posts.find(post => post.id === postid);
    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }
    return {
        title: post.title,
    }
}

const Post = async ({ params }: { params: { postid: string } }) => {
    const posts = getSortedPostData(); //deduped
    const { postid } = params;

    if (!posts.find(post => post.id === postid)) {
        return notFound();
    }

    const { title, date, contentHtml } = await getPostData(postid);

    const pubDate = getFormattedDate(date)

    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}

export default Post