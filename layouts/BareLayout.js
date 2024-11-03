import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Comments from "@/components/comments";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}) {
  const { title } = frontMatter;

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          </div>
          <div>
            <div className="pb-8" style={{ gridTemplateRows: "auto 1fr" }}>
              <div className="xl:pb-0 xl:col-span-3 xl:row-span-2">
                <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                  {children}
                </div>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
