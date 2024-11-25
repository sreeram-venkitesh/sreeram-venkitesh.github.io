const siteMetadata = {
  title: 'Sreeram Venkitesh',
  author: 'Sreeram Venkitesh',
  headerTitle: 'Sreeram Venkitesh',
  description: 'Notes on software development, productivity and building your career in tech ✨',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://sreeram.xyz',
  siteRepo: 'https://github.com/sreeram-venkitesh/sreeram-venkitesh.github.io',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/sreeram_cropped.jpg',
  socialBanner: '/static/images/banner.png',
  email: 'sreeramvenkitesh@gmail.com',
  github: 'https://github.com/sreeram-venkitesh',
  twitter: 'https://twitter.com/sreeramvnkitesh',
  youtube: 'https://youtube.com/c/sreeramvenkitesh',
  bluesky: 'https://bsky.app/profile/sreeram.xyz',
  linkedin: 'https://www.linkedin.com/in/sreeramvenkitesh',
  locale: 'en-US',
  analytics: {
    // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    googleAnalyticsId: 'G-8CPGPB3BKD', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'disqus', // supported providers: giscus, utterances, disqus
    disqusConfig: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: 'sreeram',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
