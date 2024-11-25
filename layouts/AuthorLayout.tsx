import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 lg:col-span-2">
            <Image
              src={avatar || '/static/images/sreeram_talk_kubecon.jpeg'}
              alt="avatar"
              width={426}
              height={600}
              className="my-auto hidden rounded md:block"
            />
            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3> */}
            {/* <div className="text-gray-500 dark:text-gray-400">{occupation}</div> */}
            {/* <div className="text-gray-500 dark:text-gray-400">{company}</div> */}
          </div>
          <div className="prose max-w-none pb-8 pt-8 text-justify text-gray-800 dark:prose-dark lg:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
