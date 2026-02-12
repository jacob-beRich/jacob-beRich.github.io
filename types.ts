
export type LangType = 'zh' | 'en';

export interface Content {
  header: {
    name: string;
    phone: string;
    email: string;
  };
  hero: {
    h1: string;
    sub: string;
  };
  resume: {
    jobs: {
      year: string;
      company: string;
      role: string;
      desc: string;
    }[];
    education: {
      school: string;
      degree: string;
      honors: string;
      credential: string;
    }[];
  };
  work: {
    title: string;
    placeholders: {
      text: string;
      screenshot: string;
      video: string;
    };
    projects: {
      title: string;
      category: string;
      tags: string[];
      description: string;
      images: string[];
    }[];
    moreProjects: {
      title: string;
      items: {
        title: string;
        desc: string;
        image: string;
      }[];
    };
  };
  mining: {
    title: string;
    subtitle: string;
    wings: {
      company: { title: string; items: string[] };
      risks: { title: string; items: string[] };
    };
    hub: {
      title: string;
      children: {
        title: string;
        icon: string; // Icon name reference
        features: string[];
      }[];
    };
  };
  value: {
    title: string;
  };
  contact: {
    btn: string;
  };
}
