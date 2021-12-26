import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Side Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I love to build good software and find the process extremely satisfying. Starting from a bare idea, the rush and thrill of coding something into existence is an unparalleled feeling. 
          </p>
          <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                github={d.github}
                demo={d.demo}
                blog={d.blog}
              />
            ))}
          </div>
        </div>
        </div>
        
      </div>
    </>
  )
}
