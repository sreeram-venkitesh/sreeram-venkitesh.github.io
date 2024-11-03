import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
// import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-5 md:py-10">
          <div>
            <Link href="/" aria-label="Sreeram Venkitesh">
              <div className="flex items-center justify-between">
                <div className="mr-3 text-4xl">
                  <img style={{minWidth: 40}} width="40" src="/static/favicons/technologist.png" alt="Icon" />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="h-8 text-2xl text-transparent bg-clip-text bg-gradient-to-br from-violet-800 to-red-500 dark:from-violet-400 dark:to-red-500 font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            {/* <ThemeSwitch /> */}
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
