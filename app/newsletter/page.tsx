import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter() {
  return (
    <>
      <div className="space-y-2 px-3 py-5 md:space-y-5 md:px-20 md:py-10">
        <p className="mt-5 text-justify text-lg leading-7">
          Want to get updated when I write new blog posts? Sign up for my newsletter to
          automatically get updates from my blog and other interesting things I'm working on!
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
