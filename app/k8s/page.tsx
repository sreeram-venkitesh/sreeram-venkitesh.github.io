import { K8s, allK8s } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import BareLayout from '@/layouts/BareLayout'

export const metadata = genPageMetadata({ title: 'Kubernetes Contributions Resume' })

export default function Page() {
  const k8sContent = allK8s.find((p) => p.slug === 'default') as K8s
  const mainContent = coreContent(k8sContent)

  return (
    <>
      <BareLayout content={mainContent}>
        <MDXLayoutRenderer code={k8sContent.body.code} />
      </BareLayout>
    </>
  )
}
