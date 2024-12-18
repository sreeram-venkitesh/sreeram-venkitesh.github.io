'use client'

import { useState } from 'react'

const NewsletterForm = ({
  title = 'Subscribe to the newsletter',
  buttondownUsername = 'sreeram-venkitesh',
}) => {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    // We don't prevent default here as we want the form to submit normally
    setSubscribed(true)
  }

  return (
    <div>
      <div className="pb-1 text-lg font-normal text-gray-800 dark:text-gray-100">{title}</div>
      <form
        className="flex flex-col sm:flex-row"
        action={`https://buttondown.com/api/emails/embed-subscribe/sreeram-venkitesh`}
        method="post"
        target="popupwindow"
        onSubmit={() => {
          window.open(`https://buttondown.com/sreeram-venkitesh`, 'popupwindow')
        }}
      >
        <div>
          <label className="sr-only text-sm" htmlFor="bd-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-72 rounded-md px-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-black"
            id="bd-email"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Email address'}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={`w-full rounded-md bg-purple-800 px-4 py-2 font-medium text-white sm:py-0 ${
              subscribed ? 'cursor-default' : 'hover:bg-purple-500 dark:hover:bg-primary-400'
            } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            value="Subscribe"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Subscribe!'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title, buttondownUsername }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} buttondownUsername={buttondownUsername} />
    </div>
  </div>
)
