import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'
import { $0 } from 'prettier'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const formatDate = (date, isDayPresent = true) => {
    const options = { year: 'numeric', month: 'short' };
    if(isDayPresent){
      options.day = "numeric";
    }
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date)).split(',').join('');
    return formattedDate;
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="space-y-5 md:space-y-8 text-zinc-800 dark:text-zinc-300" >
        <div className="py-10 px-3 md:px-20 space-y-2 md:space-y-5">
          <p className="text-lg mt-5 leading-7 text-justify">
            Hey 👋🏼 I'm Sreeram, a software developer from Kerala, India's beautiful west coast. This is my personal website, 
            where I share my notes about things I'm interested in.
            Think of this as a <span><a href="https://joelhooks.com/digital-garden" className='underline' target="_blank">digtial garden</a></span> where I grow ideas and and curate notes.
          </p>
          <br />

          <div className='space-y-10'>

          {/* Most recent 10 posts */}
          <div className='space-y-3'>            
            <p className='text-lg leading-7 font-semibold'>Recent posts</p>
            <table className='px-10 w-full leading-8'>
              <tbody>
              {
                posts.slice(0,10).map(item => (
                <tr className='w-full text-xs md:text-lg'>
                  <td width="15%" className='text-gray-400 align-text-top'><a href={"blog/" + item.slug}>{formatDate(item.date)}</a></td>
                  <td className='w-4/5 pl-3 md:pl-4 align-text-top'><a href={"blog/" + item.slug}>{item.title}</a></td>
                </tr>
                ))
              }
              </tbody>
            </table>
          </div>

          {/* Personal Favourites */}
          <div className='space-y-3'>            
            <p className='text-lg leading-7 font-semibold'>Personal Favourites</p>
            <table className='px-10 w-full leading-8'>
              <tbody>
              {
                posts.filter(item => item.tags.includes('favourite')).slice(0,10).map(item => (
                <tr className='w-full text-xs md:text-lg'>
                  <td width="15%" className='text-gray-400 align-text-top'><a href={"blog/" + item.slug}>{formatDate(item.date, false)}</a></td>
                  <td className='w-4/5 pl-3 md:pl-4 align-text-top'><a href={"blog/" + item.slug}>{item.title}</a></td>
                </tr>
                ))
              }
              </tbody>
            </table>
          </div>
          
          {/* Rails Devops */}
          <div className='space-y-3'>            
            <p className='text-lg leading-7 font-semibold'>Devops for Ruby on Rails</p>
            <table className='px-10 w-full leading-8'>
              <tbody>
              {
                posts.filter(item => item.tags.includes('devops') && item.tags.includes('ruby-on-rails')).slice(0,10).map(item => (
                <tr className='w-full text-xs md:text-lg'>
                  <td width="15%" className='text-gray-400 align-text-top'><a href={"blog/" + item.slug}>{formatDate(item.date, false)}</a></td>
                  <td className='w-4/5 pl-3 md:pl-4 align-text-top'><a href={"blog/" + item.slug}>{item.title}</a></td>
                </tr>
                ))
              }
              </tbody>
            </table>
          </div> 
          
          </div>
        </div>
      </div>
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
