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
      <div className="space-y-5 md:space-y-8 text-zinc-800 dark:text-zinc-50" >
        <div className="py-10 px-20 space-y-2 md:space-y-5">
          <p className="text-xl">
            Hey 👋🏼
          </p>
          <p className="text-xl leading-7 text-justify">
            I'm Sreeram, a software developer from Kerala, India's beautiful west coast. This is my personal website, 
            where I share my notes and writings about the things I'm interested in.
            Think of this as a <span><a href="https://joelhooks.com/digital-garden" className='underline'>digtial garden</a></span> where I plant seeds, grow my ideas and curate my notes.
          </p>
          <br />
          <p className='text-xl leading-7 font-semibold'>Some personal favourites</p>
          <ul className='list-disc px-10 leading-8'>
            <li>
              <a href="/blog/getting-better-at-your-job" className='text-xl underline'>
                What it means to be good at your Software Engineering Job
              </a>
            </li>
            <li>
              <a href="/blog/errors" className='text-xl underline'>
                Errors, the ultimate architect of everything
              </a>
            </li>
            <li>
              <a href="/blog/bookmarks" className='text-xl underline'>
                How I manage my bookmarks productively
              </a>
            </li>
            <li>
              <a href="/blog/frameworks-of-thought" className='text-xl underline'>
                Building frameworks of thought
              </a>
            </li>
            <li>
              <a href="/blog/finding-software-job" className='text-xl underline'>
                Tips for finding yourself a software job
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
