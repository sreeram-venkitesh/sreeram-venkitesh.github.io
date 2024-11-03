import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2 xl:col-span-2">
            <Image
              src={avatar}
              alt="avatar"
              width="426px"
              height="600px"
              className="my-auto hidden md:block"
            />
            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3> */}
            {/* <div className="text-gray-500 dark:text-gray-400">{occupation}</div> */}
            {/* <div className="text-gray-500 dark:text-gray-400">{company}</div> */}
          </div>
          <div className="pt-8 pb-8 text-gray-800 prose dark:prose-dark max-w-none xl:col-span-2 text-justify">{children}</div>
        </div>
      </div>
    </>
  )
}
