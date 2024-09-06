const talksData = [
  {
    name: "The Two Sides of the Kubernetes Enhancement Proposals",
    place: "KubeCon + CloudNativeCon China 2024, Hong Kong",
    description: "Spoke about the work done by the release team and the enhancements subproject of SIG Architecture along with Rayan. My talk at KubeCon!",
    type: "Talk",
    video: "https://www.youtube.com/watch?v=qVl0lJynTLI&list=PLj6h78yzYM2NcAGHRxgBHY8x3QTfnZQCv&index=126",
    link: "https://events.linuxfoundation.org/kubecon-cloudnativecon-open-source-summit-ai-dev-china/",
    featured: true
  }, 
  {
    name: "Climbing the ladders of the Kubernetes contributor community",
    place: "KuberTENes Birthday Bash, Kerala (June 2024)",
    description: "Talked about the various ways in which new contributors can get involved in the Kubernetes community at the local KuberTENes event.",
    type: "Talk",
    link: "https://community.cncf.io/events/details/cncf-cloud-native-kerala-presents-kubertenes-birthday-bash-kerala/",
    featured: false
  },
  {
    name: "Last Week In Kubernetes Development Newsletter",
    place: "Kubernetes Contributor Summit, KubeCon EU, Paris (Mar 2024)",
    description: "Gave a mini talk at the Contributor Summit event about the LWKD newsletter.",
    type: "Talk",
    featured: true
  },
  {
    name: "Understanding Kubernetes internals by running a cluster from scratch",
    place: "Kubernetes Community Days Kerala (Feb 2024)",
    description: "This was my first time doing a live demo on stage. It was fun.",
    video: "https://www.youtube.com/watch?v=WLaW8Sc6FjU",
    type: "Talk",
    featured: true
  }, 
  {
    name: "How we built neetoDeploy, our PaaS deployment service using Kubernetes on Amazon EKS",
    place: "AWS Commmunity Day, Kochi (Dec 2023)",
    description: "The final and upcoming talk for 2023. The organizers had mentioned that there is an empty slot for a talk when I had met them at KubeDay India.",
    video: "",
    link: "https://x.com/awsugkochi/status/1735963962280165437?s=20",
    type: "Talk",
    featured: false
  }, 
  {
    name: "Scaling neetoDeploy from zero to production - Building, maintaining and optimizing our cloud deployment platform",
    place: "SREConf 2023 (Nov 2023)",
    description: "SREConf was organized by HasGeek and it was a masterclass on how to organize a technical conference. There were multiple practice sessions leading up to day of the conference. Even on the day of the conference, the organizers and volunteers made sure that everything is executed smoothly and in time. Thanks to their efforts in curating the event, all the talks were really good.",
    video: "https://hasgeek.com/rootconf/sreconf-2023/sub/scaling-neetodeploy-from-zero-to-production-buildi-RzAuZKcmqZunJSoHnH4Ufy",
    link: "https://hasgeek.com/rootconf/sreconf-2023/sub/scaling-neetodeploy-from-zero-to-production-buildi-RzAuZKcmqZunJSoHnH4Ufy",
    type: "Talk",
    featured: false
  },
  {
    name: "Getting started with contributing to Kubernetes",
    place: "Cloud Native Day Pune (Oct 2023)",
    description: "I submitted the CFP for this talk once I was pretty active in the Kubernetes open source ecosystem. The v1.29 release cycle was going on and I was a shadow in the enhancements team. I was able to meet a lot of talented folks who were speaking at the event and had wonderful discussions with them regarding platform engineering and devops.",
    video: "https://youtu.be/a-YwCzTEotg",
    type: "Talk",
    featured: false
  },
  {
    name: "Adventures in building our own PaaS",
    place: "DevOpsDays Bengaluru (Oct 2023)",
    description: "After my experience with DevOpsDays in the previous year, I was really excited for DevOpsDays Bengaluru. I caught up with a bunch of friends and made new ones. This time around too I gave a lightning talk about what we've been building with neetoDeploy over the past year. It was a nice to look back at the talk I had given last year and how much we've come since then.",
    video: "https://www.youtube.com/watch?v=-2PEY1CUKFo",
    type: "Talk",
    featured: false
  },
  {
    name: "Building a Heroku alternative on Kubernetes",
    place: "DevOpsDays India (Oct 2022)",
    description: "DevOpsDays India was one of the biggest devops conferences I've been to till this point. I was able to meet a lot of folks in this space in person as well. On the second day, I was able to give a lightning talk about how are building neetoDeploy. This was my first time talking on stage at an actual conference.",
    video: "https://www.youtube.com/watch?v=V0G_9OJmISI&list=PLbgP71NCXCqHAfztq9uRBd26KJ5V5N8v6&index=17",
    type: "Talk",
    featured: false
  },
  {
    name: 'Introduction to Emulation Development',
    description: "This was the first time I was presenting anything technical at an event. I got to talk about building emulators for retro video game consoles. Huge shoutout to the organizers who accepted my talk even though I didn't have much contributions to open source projects in this space. They specifically mentioned that there's a first time for everything and this is something I think about when talking to my juniors. The conference was conducted online because of the Covid-19 pandemic",
    place: 'FOSSASIA Open Tech Summit, 2021',
    video: "https://www.youtube.com/watch?v=iZbzzmy-QwI",
    type: "Talk",
    link: "https://twitter.com/fossasiasg/status/1363428255072546817",
    featured: true
  },
  {
    name: "Evolution of Media and Content Creation",
    description: "This was during the time when I was dabbling with media, YouTube and content creation. I was in my third year of college then.",
    place: "All Kerala Computer Society Student Congress, IEEE (Decmber 2019)",
    video: "https://www.youtube.com/watch?v=E3ngQLHRGKs",
    type: "Talk",
    link: "",
    featured: false,
  },
  {
    name: "Lightning Talk about my journey with YouTube",
    description: "A developer conference conducted by Model Engineering College",
    place: "MEC.Conf (Oct 2019)",
    type: "Talk",
    video: "https://www.youtube.com/watch?v=0rowYN-IXHY",
    featured: false,
  },
  // {
  //   name: "Using Deta, a cloud for the next billion ideas",
  //   description: "",
  //   place: "Student Developer Society",
  //   type: "Talk",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Industrial Trends and Job Opportunities in a Post Covid World",
  //   description: "",
  //   place: "TinkerHub RIET",
  //   type: "Talk",
  //   video: "",
  //   link:"https://www.facebook.com/TinkerHubRIET/photos/a.111880607064642/171697727749596/?type=3&theater",
  //   featured: false
  // },
  // {
  //   name: "Introduction to Free Software",
  //   description: "At the inaugration of their college FOSS Cell",
  //   place: "Vishwajyothi College of Engineering",
  //   type: "Talk",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Introduction to Machine Learning",
  //   description: "3 days hands on workshop for the students and teachers",
  //   place: "College of Engineering, Poonjar",
  //   type: "Workshop",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Project based introduction to Machine Learning",
  //   description: "",
  //   place: "Pie & AI Palakkad",
  //   type: "Workshop",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Introduction to Machine Learning",
  //   description: "",
  //   place: "Developer Student Club MACE",
  //   type: "Workshop",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Introduction to Machine Learning",
  //   description: "",
  //   place: "IEEE MACE",
  //   type: "Workshop",
  //   video: "",
  //   featured: false
  // },
  // {
  //   name: "Introduction to Git and GitHub",
  //   description: "",
  //   place: "IEEE MACE",
  //   type: "Workshop",
  //   video: "",
  //   featured: false
  // },
]

export default talksData
