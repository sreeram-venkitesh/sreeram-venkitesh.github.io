interface Project {
  title: string
  description: string
  github?: string
  blog?: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Prompts',
    description:
      "An app for writers to get out of a writers' block easily. Works by fetching prompts from r/WritingPrompts",
    github: 'https://github.com/sreeram-venkitesh/prompt',
    blog: '',
  },
  {
    title: 'Notion.css',
    description:
      'A minimal CSS framework that resembles the aesthetic of the note taking app Notion',
    github: 'https://github.com/sreeram-venkitesh/notion.css/',
    href: 'https://sreeram-venkitesh.github.io/notion.css/',
    blog: '',
  },
  {
    title: 'quarantineresu.me',
    description:
      'A resume builder to showcase all the stuff you did during the 2020 coronavirus pandemic',
    github: 'https://github.com/sreeram-venkitesh/quarantineresu.me',
    blog: '',
  },
  {
    title: 'Messier REST API',
    description: 'A REST API for the Messier Catalogue of Deep Sky Objects',
    github: 'https://github.com/sreeram-venkitesh/messier-rest-api',
    blog: '',
  },
  {
    title: 'Clear Skies',
    description:
      'My astronomy blog where I post articles and keep a digital record of my observations',
    href: 'https://sreeram-venkitesh.github.io/clear-skies/',
  },
]

export default projectsData
