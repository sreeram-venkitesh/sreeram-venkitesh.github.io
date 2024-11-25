import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="space-y-6 md:mt-10">
      <img
        className="mx-auto w-11/12 md:w-1/3"
        src="https://media.giphy.com/media/3ohs81rDuEz9ioJzAA/giphy-downsized-large.gif"
      />
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:leading-14">
          404
        </h1>
        <p className="mb-4 text-center text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <br />
        <Link
          href="/"
          className="focus:shadow-outline-purple inline rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-purple-700 focus:outline-none dark:hover:bg-purple-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
