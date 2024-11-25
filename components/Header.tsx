import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label="Sreeram Venkitesh">
        <div className="flex items-center justify-between">
          <div className="mr-3 text-4xl">
            <img
              style={{ minWidth: 40 }}
              width="40"
              src="/static/favicons/technologist.png"
              alt="Icon"
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="h-8 bg-gradient-to-br from-violet-800 to-red-500 bg-clip-text text-2xl font-semibold text-transparent dark:from-violet-400 dark:to-red-500 sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-medium text-gray-900 hover:underline dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
