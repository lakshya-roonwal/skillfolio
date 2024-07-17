
export interface Basics {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Education {
    id:number;
  college: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Experience {
  id:number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  details: string[];
}

export interface Project {
  id:number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  link: string;
  details: string[];
}

export type Skills = {
  [category: string]: string[]; // Index signature for any string as a category
};

export interface ResumeData {
  basics: Basics;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
}
