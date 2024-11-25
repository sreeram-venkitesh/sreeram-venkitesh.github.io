import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/topics/${slug(text)}`}
      className="my-1 mr-3 rounded bg-blue-100 px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:bg-gray-900 dark:text-primary-500 dark:hover:text-primary-400"
    >
      #{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
