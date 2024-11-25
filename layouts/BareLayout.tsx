import { ReactNode } from 'react'
import Comments from '@/components/Comments'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { K8s } from 'contentlayer/generated'

interface LayoutProps {
  content: CoreContent<K8s>
  children: ReactNode
}

export default function BareLayout({ children, content }: LayoutProps) {
  const { title, slug } = content

  return (
    <>
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          </div>
          <div>
            <div className="pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
              <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
              </div>
              <Comments slug={slug} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
