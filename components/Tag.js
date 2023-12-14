import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/topics/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium text-gray-600 bg-blue-100 dark:bg-gray-900 px-2 py-1 my-1 rounded hover:text-gray-900 dark:text-primary-500 dark:hover:text-primary-400">
        #{text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
