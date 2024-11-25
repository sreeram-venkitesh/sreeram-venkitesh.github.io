import talksData from '@/data/talksData'
import TalkCard from '@/components/TalkCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Talks' })

export default function Talks() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Talks
          </h1>
          <p className="pt-3 text-lg leading-7 text-gray-800 dark:text-gray-600">
            I like to talk at technical conferences and I've given a couple of talks about devops,
            Kubernetes and platform engineering. If you want me to speak at your event about any of
            these topics, you can reach out to me{' '}
            <a className="text-primary-500 underline" href="/about">
              here.
            </a>
          </p>
          <div className="container px-2 py-8">
            <div className="-m-4 flex flex-wrap">
              {talksData.map((d) => (
                <TalkCard
                  key={d.name}
                  name={d.name}
                  description={d.description}
                  place={d.place}
                  type={d.type}
                  link={d.link}
                  video={d.video}
                  date={d.date}
                  featured={d.featured}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
