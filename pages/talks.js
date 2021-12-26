import siteMetadata from "@/data/siteMetadata";
import talksData from "@/data/talksData";
import TalkCard from "@/components/TalkCard";
import { PageSEO } from "@/components/SEO";

export default function Talks() {
  return (
    <>
      <PageSEO
        title={`Talks - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Talks & Workshops
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I have talked at a couple of conferences in the past few years. I
            like to share and talk about things I've learnt through conference
            talk sessions and workshops.
          </p>
          <div className="container py-12">
            <div className="flex flex-wrap -m-4">
              {talksData.map(d => (
                <TalkCard
                  key={d.title}
                  name={d.name}
                  description={d.description}
                  place={d.place}
                  type={d.type}
                  link={d.link}
                  video={d.video}
                  featured={d.featured}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
