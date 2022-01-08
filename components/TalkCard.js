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
  <div className="p-4 w-full">
    <div className="h-full overflow-hidden border-b-2 border-gray-200 border-opacity-60 dark:border-gray-700">
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
      <div className="p-6">
        <h2 className="mb-1 text-2xl font-bold leading-8 tracking-tight">
          {name}
        </h2>
        <p className="mb-1 prose text-gray-800 max-w-none dark:text-gray-400">
          {place}
        </p>
        <a className="mr-3 text-sm font-medium text-gray-600 bg-red-100 dark:bg-gray-900 px-2 py-1 rounded hover:text-gray-900 dark:text-primary-500 dark:hover:text-primary-400">
          {type.split(" ").join("-")}
        </a>
        <p className="mt-6 prose text-gray-500 max-w-none dark:text-gray-400">
          {description}
        </p>
        <div className="flex space-x-3">
          {link && (
            <Link
              href={link}
              className="text-base font-medium leading-6 text-red-400 dark:text-primary-500 hover:text-red-600 dark:hover:text-primary-400"
              aria-label={`Link to ${name}`}
            >
              More details &rarr;
            </Link>
          )}
          {video && (
            <Link
              href={video}
              className="text-base font-medium leading-6 text-red-400 dark:text-primary-500 hover:text-red-600 dark:hover:text-primary-400"
              aria-label={`Video of ${name}`}
            >
              Video &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default TalkCard;
