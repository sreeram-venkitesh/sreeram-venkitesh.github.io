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
            Talks           
          </h1>
          <p className="text-lg pt-3 leading-7 text-gray-800 dark:text-gray-600">
            I like to talk at technical conferences and I've given a couple of talks about devops, Kubernetes and platform engineering. 
            If you want me to speak at your event about any of these topics, you can reach out to me <a className="underline text-primary-500" href="/about">here.</a>
          </p>
          <div className="container py-8 px-2">
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
                  date={d.date}
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
