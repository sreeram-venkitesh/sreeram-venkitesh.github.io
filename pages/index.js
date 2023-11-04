import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-5 md:space-y-8 text-zinc-800 dark:text-zinc-300" >
        <div className="py-10 px-20 space-y-2 md:space-y-5">
          <p className="text-lg">
            Hey 👋🏼
          </p>
          <p className="text-lg leading-7 text-justify">
            I'm Sreeram, a software developer from Kerala, India's beautiful west coast. This is my personal website, 
            where I share my notes and writings about things I'm interested in.
            Think of this as a <span><a href="https://joelhooks.com/digital-garden" className='underline' target="_blank">digtial garden</a></span> where I plant seeds, grow ideas and curate my notes.
          </p>
          <br />
          <p className='text-lg leading-7 font-semibold'>Some personal favourites</p>
          <ul className='list-disc px-10 leading-8'>
            <li>
              <a href="/blog/getting-better-at-your-job" className='text-lg underline'>
                What it means to be good at your software engineering job
              </a>
            </li>
            <li>
              <a href="/blog/errors" className='text-lg underline'>
                Errors, the architect of life
              </a>
            </li>
            <li>
              <a href="/blog/bookmarks" className='text-lg underline'>
                How I manage my bookmarks productively
              </a>
            </li>
            <li>
              <a href="/blog/frameworks-of-thought" className='text-lg underline'>
                Building frameworks of thought
              </a>
            </li>
            <li>
              <a href="/blog/finding-software-job" className='text-lg underline'>
                Tips for finding yourself a good software job
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
