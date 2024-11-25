import Image from './Image'
import Link from './Link'
import Tag from './Tag'

const TalkCard = ({ name, place, description, video, link, type, date, featured = false }) => (
  <div
    className={`relative w-full rounded-xl px-6 py-5 ${featured ? 'mb-2 bg-violet-50' : ''} ${new Date(date) > new Date() ? 'mb-2 border border-dotted border-red-200' : ''}`}
  >
    {featured && <span className="absolute right-5 top-5 text-xl">📌</span>}
    {new Date(date) > new Date() && (
      <span className="text-md absolute right-5 top-5 text-red-600">Upcoming!</span>
    )}
    <div className="h-full overflow-hidden">
      {/* {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center lg:h-48 md:h-36"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center lg:h-48 md:h-36"
          width={544}
          height={306}
        />
      )} */}
      <div className="space-y- pb-3">
        <div className="items-center">
          <h3 className="mb-1 text-xl font-bold leading-8 tracking-tight">{name}</h3>
        </div>
        <div className="space-y-1">
          <p className="prose max-w-none text-gray-800 dark:text-gray-400">{place}</p>
          <p className="max-w-none text-justify text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex space-x-3">
            {video && (
              <Link
                href={video}
                className="text-base font-medium leading-6 text-blue-400 underline hover:text-blue-600 dark:text-primary-500 dark:hover:text-primary-400"
                aria-label={`Video of ${name}`}
              >
                Video {/* &rarr; */}
              </Link>
            )}
            {link && (
              <Link
                href={link}
                className="text-base font-medium leading-6 text-blue-400 underline hover:text-blue-600 dark:text-primary-500 dark:hover:text-primary-400"
                aria-label={`Link to ${name}`}
              >
                More details &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default TalkCard
