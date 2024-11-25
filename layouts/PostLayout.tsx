'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { useState } from 'react'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, toc, readingTime } = content
  const [contents, setContents] = useState(true)
  const basePath = path.split('/')[0]
  const headerClassName =
    toc.length > 0 ? 'pb-8' : 'pb-8 divide-y divide-gray-200 dark:divide-gray-700'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="">
          <header className="pt-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className={headerClassName} style={{ gridTemplateRows: 'auto 1fr' }}>
            <dl className="pb-3 text-center">
              <div className="pt-3 text-center text-gray-400">
                {readingTime.words} words &bull; {readingTime.text}
              </div>
              {tags && (
                <div className="py-3">
                  <div className="flex flex-wrap justify-center">
                    {tags
                      .filter((item) => item !== 'favourite')
                      .map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                  </div>
                </div>
              )}
              {toc.length > 0 && (
                <div className="prose mx-auto my-3 max-w-none border border-gray-200 px-3 text-center dark:prose-dark dark:border-gray-700 md:w-1/2 md:px-5">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="font-bold">Contents</p>
                    <button onClick={() => setContents(!contents)}>
                      [{contents ? 'Hide' : 'Show'}]
                    </button>
                  </div>
                  {contents && (
                    <div className="pb-5">
                      <ol className="text-left">
                        {toc.map((item) => (
                          <li key={item.slug}>
                            <a href={item.url}>{item.value}</a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="prose max-w-none pb-8 pt-3 text-justify font-medium dark:prose-dark md:pt-5 xl:px-36">
                {children}
              </div>
              <Comments slug={slug} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
