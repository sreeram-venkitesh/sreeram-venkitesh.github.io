import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'BareLayout'

export async function getStaticProps() {
  const kubeDetails = await getFileBySlug('static', ['kubernetes'])
  return { props: { kubeDetails } }
}

export default function Kubernetes({ kubeDetails }) {
  const { mdxSource, frontMatter } = kubeDetails

  return (
    <MDXLayoutRenderer
      layout={DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
