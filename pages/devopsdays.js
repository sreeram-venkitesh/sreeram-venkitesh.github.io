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
            Hey! 👋🏼
          </p>
          <p className="text-lg leading-7 text-justify">
           Hope you had a great time at DevopsDays India 2022!
          </p>
          <p className="text-lg leading-7 text-justify">
            If you're here then you probably attended my lightning talk on how we're 
            building an alternative to Heroku review apps at <span><a href="https://bigbinary.com" className='underline'>BigBinary</a></span>.
          </p>
          <p className="text-lg leading-7 text-justify">
            You can get in touch with me if you wanna learn more about neetoReview and would love to 
            play around with it.
          </p>
          <div className='text-center'>
            <p className='text-lg leading-7'>
              <span className='underline text-sky-600 font-semibold dark:text-sky-200'>
                <a href="https://sreeramv.neetocal.com/calendar/neetoreview-demo-devopsdays-india-2022">
                  Schedule a meeting
                </a>
              </span>
            </p>
            <br />
            <p className='mt-3'>More info</p>
            <div className='space-x-4 flex justify-center items-center mt-3'>
              <p className='text-lg leading-7'>
                <span className='underline text-sky-600 font-semibold dark:text-sky-200'>
                  <a href="https://bigbinary.com" target="_blank">
                    BigBinary 
                  </a>
                </span>
              </p>
              <div>•</div>
              <p className='text-lg leading-7'>
                <span className='underline text-sky-600 font-semibold dark:text-sky-200'>
                  <a href="https://neeto.com" target="_blank">
                    neeto
                  </a>
                </span>
              </p>
            </div>
          </div>
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
