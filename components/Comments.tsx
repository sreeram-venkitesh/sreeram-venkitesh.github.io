'use client'

import { Comments as CommentsComponent, DisqusConfig } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(true)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments as DisqusConfig} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </div>
  )
}
