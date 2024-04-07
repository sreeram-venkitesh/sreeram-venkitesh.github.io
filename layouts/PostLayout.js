import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import Comments from "@/components/comments";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import {useState} from "react";

const editUrl = fileName =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = slug =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`;

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  toc,
  prev,
  children,
}) {
  const { slug, fileName, date, title, tags, readingTime } = frontMatter;
  const [contents,setContents] = useState(true);

  const headerClassName = toc.length > 0 ? "pb-8" : "pb-8 divide-y divide-gray-200 dark:divide-gray-700"
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
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
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className={headerClassName}
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pb-3 text-center">
              <div className="text-center pt-3 text-gray-400">
              {readingTime.words} words &bull; {readingTime.text} 
              </div>
              {tags && (
                <div className="py-3">
                  <div className="flex flex-wrap justify-center">
                    {tags.filter(item => item !== "favourite").map(tag => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              { 
                toc.length > 0 && 
                <div className="my-3 px-10 w-1/2 border mx-auto border-gray-200 dark:border-gray-700 prose dark:prose-dark max-w-none text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="font-bold">Contents</p>
                    <a onClick={() => setContents(!contents)}>[{contents ? "Hide" : "Show"}]</a>
                  </div>
                  { contents &&
                    <div className="pb-5">
                      <ol className="text-left">{toc.map(item => <li><a href={item.url}>{item.value}</a></li>)}</ol>
                    </div>
                  }
                </div>
              }
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="pt-10 text-justify pb-8 prose font-medium dark:prose-dark max-w-none xl:px-36">
                {children}
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 dark:divide-gray-700">
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
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
  );
}
