export interface ResumeData {
    basics: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      github: string;
    };
    education: {
      college: string;
      degree: string;
      startDate: string;
      endDate: string;
      location: string;
      description: string;
    }[];
    experience: {
      company: string;
      role: string;
      startDate: string;
      endDate: string;
      location: string;
      details: string[];
    }[];
    projects: {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      technologies: string[];
      link: string;
      details: string[];
    }[];
    skills: {
      Languages: string[];
      Frameworks: string[];
      "Developer Tools": string[];
      Libraries: string[];
    };
  }
  