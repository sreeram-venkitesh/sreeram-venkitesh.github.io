import Image from "./Image";
import Link from "./Link";
import Tag from "./Tag";

const TalkCard = ({
  name,
  place,
  description,
  video,
  link,
  type,
  featured = false,
}) => (
  <div className={`py-5 px-6 relative w-full rounded-xl ${featured ? 'bg-violet-50 mb-2' : ''}`}>
    {featured && (
      <span className="absolute top-5 right-5 text-xl">🌠</span>
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
          <h3 className="mb-1 text-xl font-bold leading-8 tracking-tight">
            {name}
          </h3>
        </div>
        <div className="space-y-1">
          <p className="prose text-gray-800 max-w-none dark:text-gray-400">
            {place}
          </p>
          <p className="text-gray-500 max-w-none text-justify dark:text-gray-400">
            {description}
          </p>
          <div className="flex space-x-3">
            {video && (
              <Link
                href={video}
                className="text-base underline font-medium leading-6 text-blue-400 dark:text-primary-500 hover:text-blue-600 dark:hover:text-primary-400"
                aria-label={`Video of ${name}`}
              >
                Video {/* &rarr; */}
              </Link>
            )}
            {link && (
              <Link
                href={link}
                className="text-base underline font-medium leading-6 text-blue-400 dark:text-primary-500 hover:text-blue-600 dark:hover:text-primary-400"
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
);

export default TalkCard;
