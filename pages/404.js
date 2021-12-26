import Link from "@/components/Link";

export default function FourZeroFour() {
  return (
    <div className="space-y-6 md:mt-10">
      <img
        className="w-11/12 md:w-1/3 mx-auto"
        src="https://media.giphy.com/media/3ohs81rDuEz9ioJzAA/giphy-downsized-large.gif"
      />
      <div className="space-y-2">
      <h1 className="text-4xl text-center font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:leading-14 md:px-6">
        404
      </h1>
      <p className="mb-4 text-center text-xl font-bold leading-normal md:text-2xl">
        Sorry we couldn't find this page.
      </p>
      </div>
      
    </div>
  );
}
