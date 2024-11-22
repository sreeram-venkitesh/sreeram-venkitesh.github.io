import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter() {
  return (
    <>
      <PageSEO title={`Newsletter! - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="py-5 md:py-10 px-3 md:px-20 space-y-2 md:space-y-5">
          <p className="text-lg mt-5 leading-7 text-justify">
            Want to get updated when I write new blog posts? Sign up for my newsletter to automatically get updates from my blog and other interesting things I'm working on!
          </p>
          <br />
          {siteMetadata.newsletter.provider !== '' && (
            <div className="flex items-center justify-center pt-4">
              <NewsletterForm />
            </div>
          )} 
      </div>
    </>
  )
}
