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

  const personalFavs = [
    {
      title: "What it means to be good at your software engineering job",
      link: "/blog/getting-better-at-your-job" 
    },
    {
      title: "Errors, the architect of life",
      link: "/blog/errors"
    },
    {
      title: "How I manage my bookmarks productively",
      link: "/blog/bookmarks"
    },
    {
      title: " Building frameworks of thought",
      link: "/blog/frameworks-of-thought"
    },
    {
      title: "Tips for finding yourself a good software job",
      link: "/blog/finding-software-job"
    },
  ]

  const railsDevops = [
    {
      title: "Rails in Production",
      link: "/blog/rails-in-production",
    },
    {
      title: "Different ways to deploy your Rails application",
      link: "/blog/devops/introduction-to-rails-in-production"
    },
    {
      title: "Initial server setup with Ubuntu 20.04 for deploying your Rails project",
      link: "/blog/devops/server-setup"
    },
    {
      title: "How to deploy your Rails app using Capistrano",
      link: "blog/devops/rails-capistrano"
    },

  ]
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
          {/* Personal Favourites */}
          <div className='space-y-3'>            
            <p className='text-lg leading-7 font-semibold'>Some personal favourites</p>
            <ul className='list-disc px-10 leading-8'>
              {
                personalFavs.map(item => (
                <li>
                  <a href={item.link} className='text-lg'>
                    {item.title}
                  </a>
                </li>
                ))
              }
            </ul>
          </div>

          {/* Rails Devops */}
          <div className='space-y-3'>
            <p className='text-lg leading-7 font-semibold'>DevOps for Ruby on Rails</p>
            <ul className='list-disc mt-0 px-10 leading-8'>
              {
                railsDevops.map(item => (
                <li>
                  <a href={item.link} className='text-lg'>
                    {item.title}
                  </a>
                </li>
                ))
              }
            </ul> 
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
