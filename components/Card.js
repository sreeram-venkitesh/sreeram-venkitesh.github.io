import Image from "./Image";
import Link from "./Link";

const Card = ({ title, description, imgSrc, github, demo, blog }) => (
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
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {demo ? (
            <Link href={demo} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>

        <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">
          {description}
        </p>
        <div className="flex space-x-4">
          {github && (
            <Link
              href={github}
              className="text-base font-medium leading-6 text-blue-400 dark:text-primary-500 hover:text-blue-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              GitHub
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              className="text-base font-medium leading-6 text-blue-400 dark:text-primary-500 hover:text-blue-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Website
            </Link>
          )}
          {blog && (
            <Link
              href={blog}
              className="text-base font-medium leading-6 text-blue-400 dark:text-primary-500 hover:text-blue-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Blog
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Card;
