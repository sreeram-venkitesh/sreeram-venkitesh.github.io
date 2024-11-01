import { useRef, useState } from 'react'

const NewsletterForm = ({ title = 'Subscribe to the newsletter', buttondownUsername = 'sreeram-venkitesh' }) => {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    // We don't prevent default here as we want the form to submit normally
    setSubscribed(true)
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form 
        className="flex flex-col sm:flex-row"
        action={`https://buttondown.com/api/emails/embed-subscribe/sreeram-venkitesh`}
        method="post"
        target="popupwindow"
        onSubmit={() => {
          window.open(`https://buttondown.com/sreeram-venkitesh`, 'popupwindow')
          handleSubmit()
        }}
      >
        <div>
          <label className="sr-only" htmlFor="bd-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className="px-4 rounded-md w-72 dark:bg-black focus:outline-none focus:ring-2 focus:border-transparent focus:ring-primary-600"
            id="bd-email"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="flex w-full mt-2 rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className={`py-2 sm:py-0 w-full bg-primary-500 px-4 rounded-md font-medium text-white ${
              subscribed ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black`}
            type="submit"
            value="Subscribe"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title, buttondownUsername }) => (
  <div className="flex items-center justify-center">
    <div className="p-6 bg-gray-100 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} buttondownUsername={buttondownUsername} />
    </div>
  </div>
)