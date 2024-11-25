import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="items-end">
      <div className="mt-3 flex flex-row items-center py-5">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>© {siteMetadata.author}</div>
          {/* <div>{` • `}</div> */}
          {/* <div>{`© ${new Date().getFullYear()}`}</div> */}
        </div>
        {/* <div className='flex'>
          <SocialIcon kind="github" href="/" size="10" />
        </div> */}
      </div>
    </footer>
  )
}
