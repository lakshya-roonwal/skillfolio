"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import Editor from "./Editor";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import MyDocument from "./MyDocument";
import Spinner from "./Spinner";
import Resume from "./Resume";
import { Button } from "./ui/button";
import { ResumeData } from "@/types/Resume.type";

const BuilderPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // const [resumeData, setResumeData] = useState({
  //   basics: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     location: "",
  //     linkedin: "",
  //     github: "",
  //   },
  //   education: [],
  //   experience: [],
  //   projects: [],
  //   skills: {
  //     Languages: [],
  //     Frameworks: [],
  //     "Developer Tools": [],
  //     Libraries: [],
  //   },
  // });
  const [resumeData, setResumeData] = useState<ResumeData>({
    basics: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 234 567 890",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    education: [
      {
        id: 1,
        college: "University of Example",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        location: "Example City, EX",
      },
      {
        id: 2,
        college: "University of Example",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        location: "Example City, EX",
      },
    ],
    experience: [
      {
        id:1,
        company: "Tech Company",
        role: "Software Engineer",
        startDate: "2019-07-01",
        endDate: "2022-06-01",
        location: "San Francisco, CA",
        details: [
          "Developed and maintained web applications using React and Node.js.",
          "Collaborated with cross-functional teams to define and design new features.",
          "Implemented automated testing and CI/CD pipelines.",
        ],
      },
      {
        id:2,
        company: "Another Tech Company",
        role: "Frontend Developer",
        startDate: "2022-07-01",
        endDate: "Present",
        location: "Remote",
        details: [
          "Led the development of the company's main product website.",
          "Optimized application performance and improved user experience.",
          "Mentored junior developers and conducted code reviews.",
        ],
      },
    ],
    projects: [
      {
        id:1,
        title: "Resume Builder",
        description: "A tool to create and manage resumes.",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        technologies: ["React", "Tailwind CSS", "Node.js"],
        link: "https://github.com/johndoe/resume-builder",
        details: [
          "Led the development of the company's main product website.",
          "Optimized application performance and improved user experience.",
          "Mentored junior developers and conducted code reviews.",
        ],
      },
      {
        id:2,
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform.",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        technologies: ["React", "Express", "MongoDB"],
        link: "https://github.com/johndoe/ecommerce-platform",
        details: [
          "Led the development of the company's main product website.",
          "Optimized application performance and improved user experience.",
          "Mentored junior developers and conducted code reviews.",
        ],
      },
    ],
    skills: {
      Languages: ["JavaScript", "Python", "Java"],
      Frameworks: ["React", "Node.js", "Express"],
      "Developer Tools": ["Git", "Docker", "Webpack"],
      Libraries: [
        "Redux",
        "GSAP",
        "Lodash",
        "Redux",
        "GSAP",
        "Lodash",
        "Redux",
        "GSAP",
        "Lodash",
        "Redux",
        "GSAP",
        "Lodash",
        "Redux",
        "GSAP",
        "Lodash",
      ],
    },
  });

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full bg-gray-200">
        <PDFDownloadLink
          document={<MyDocument data={resumeData} />}
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              setLoading(true);
              return "Generating document...";
            }
            setLoading(false);
            return (
              <button className="p-2 bg-blue-500 text-white rounded">
                Download PDF
              </button>
            );
          }}
        </PDFDownloadLink>
        <Editor setLoading={setLoading} setResumeData={setResumeData} />
      </div>
      <div className="w-1/2 h-full relative flex items-center justify-center bg-gray-400">
        <TransformWrapper
          maxScale={2}
          minScale={0.4}
          initialPositionX={100}
          initialPositionY={15}
          initialScale={0.72}
          limitToBounds={false}
        >
          <TransformComponent
            wrapperClass="w-full !h-screen"
            contentClass="grid items-start justify-start pointer-events-none"
          >
            <Resume data={resumeData} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default BuilderPage;
