import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const formatDate = (date: string | number | Date, isDayPresent = true) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      ...(isDayPresent ? { day: 'numeric' } : {}),
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', options)
      .format(new Date(date))
      .split(',')
      .join('')
    return formattedDate
  }

  return (
    <>
      <div className="space-y-5 text-zinc-800 dark:text-zinc-300 md:space-y-8">
        <div className="space-y-2 px-3 py-5 md:space-y-5 md:px-20 md:py-10">
          <p className="mt-5 text-justify text-lg leading-7">
            Hey 👋🏼 I'm Sreeram, a software developer from Kerala, India's beautiful west coast. This
            is my personal website, where I share my notes about things I'm interested in. Think of
            this as a{' '}
            <span>
              <a href="https://joelhooks.com/digital-garden" className="underline" target="_blank">
                digtial garden
              </a>
            </span>{' '}
            where I grow ideas and and curate notes.
          </p>
          <br />

          <div className="space-y-10">
            {/* Most recent 10 posts */}
            <div className="space-y-3">
              <p className="text-lg font-semibold leading-7">Recent posts</p>
              <table className="w-full px-10 leading-8">
                <tbody>
                  {posts.slice(0, 10).map((item) => (
                    <tr className="w-full text-lg" key={item.slug}>
                      <td width="15%" className="align-text-top text-gray-400">
                        <a href={'blog/' + item.slug}>{formatDate(item.date)}</a>
                      </td>
                      <td className="w-4/5 pl-3 align-text-top md:pl-4">
                        <a href={'blog/' + item.slug}>{item.title}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Personal Favourites */}
            <div className="space-y-3">
              <p className="text-lg font-semibold leading-7">Personal Favourites</p>
              <table className="w-full px-10 leading-8">
                <tbody>
                  {posts
                    .filter((item) => item.tags.includes('favourite'))
                    .slice(0, 10)
                    .map((item) => (
                      <tr className="w-full text-lg" key={item.slug}>
                        <td width="15%" className="align-text-top text-gray-400">
                          <a href={'blog/' + item.slug}>{formatDate(item.date, false)}</a>
                        </td>
                        <td className="w-4/5 pl-3 align-text-top md:pl-4">
                          <a href={'blog/' + item.slug}>{item.title}</a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Kubernetes Dev */}
            <div className="space-y-3">
              <p className="text-lg font-semibold leading-7">Kubernetes Development</p>
              <table className="w-full px-10 leading-8">
                <tbody>
                  {posts
                    .filter((item) => item.tags.includes('kubernetes-dev'))
                    .slice(0, 10)
                    .map((item) => (
                      <tr className="w-full text-lg" key={item.slug}>
                        <td width="15%" className="align-text-top text-gray-400">
                          <a href={'blog/' + item.slug}>{formatDate(item.date, false)}</a>
                        </td>
                        <td className="w-4/5 pl-3 align-text-top md:pl-4">
                          <a href={'blog/' + item.slug}>{item.title}</a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Rails Devops */}
            <div className="space-y-3">
              <p className="text-lg font-semibold leading-7">Devops for Ruby on Rails</p>
              <table className="w-full px-10 leading-8">
                <tbody>
                  {posts
                    .filter(
                      (item) => item.tags.includes('devops') && item.tags.includes('ruby-on-rails')
                    )
                    .slice(0, 10)
                    .map((item) => (
                      <tr className="w-full text-lg" key={item.slug}>
                        <td width="15%" className="align-text-top text-gray-400">
                          <a href={'blog/' + item.slug}>{formatDate(item.date, false)}</a>
                        </td>
                        <td className="w-4/5 pl-3 align-text-top md:pl-4">
                          <a href={'blog/' + item.slug}>{item.title}</a>
                        </td>
                      </tr>
                    ))}
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
