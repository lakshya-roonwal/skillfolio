"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import EditEducation from "./EditEducation";
import EditExperience from "./EditExperience";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProjects from "./EditProjects";
import EditSkills from "./EditSkills";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

const BuilderPage = () => {
  const [loading, setLoading] = useState(true);
  const [basicResumeData, setBasicResumeData] = useState({
    name: "Lakshya runwal",
    location: "Rajasthan, India",
    email: "lakshyaroonwal@gmail.com",
    phone: "7877669925",
    linkedin: "https://something.com",
    github: "https://github.com/lakshya-roonwal",
  });
  const [educationItems, setEducationItems] = useState([
    {
      id: 1,
      college: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      startDate: "July 2018",
      endDate: "June 2021",
      location:"India"
    },
    {
      id: 2,
      college: "Massachusetts Institute of Technology",
      degree: "Master of Science in Electrical Engineering",
      startDate: "July 2018",
      endDate: "June 2021",
      location:"India"
    },
  ]);

  const handleSaveResumeData = () => {
    setLoading(true);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      education:educationItems,
      basics: basicResumeData,
    }));
  };

  const handleInputChange = (field, value) => {
    setBasicResumeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const [resumeData, setResumeData] = useState({
    basics: {
      name: basicResumeData.name,
      email: basicResumeData.email,
      phone: basicResumeData.phone,
      location: basicResumeData.location,
      linkedin: basicResumeData.linkedin,
      github: basicResumeData.github,
    },
    education:educationItems,
    experience: [
      {
        title: "Undergraduate Research Assistant",
        company: "Texas A&M University",
        location: "College Station, TX",
        startDate: "June 2020",
        endDate: "Present",
        details: [
          "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
          "Developed a full-stack web application using Flask, React, PostgreSQL, and Docker to analyze GitHub data",
          "Explored ways to visualize GitHub collaboration in a classroom setting",
        ],
      },
      {
        title: "Information Technology Support Specialist",
        company: "Southwestern University",
        location: "Georgetown, TX",
        startDate: "Sep. 2018",
        endDate: "Present",
        details: [
          "Communicate with managers to set up campus computers used on campus",
          "Assess and troubleshoot computer problems brought by students, faculty, and staff",
          "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
        ],
      },
      {
        title: "Artificial Intelligence Research Assistant",
        company: "Southwestern University",
        location: "Georgetown, TX",
        startDate: "May 2019",
        endDate: "July 2019",
        details: [
          "Explored methods to generate video game dungeons based off of The Legend of Zelda",
          "Developed a game in Java to test the generated dungeons",
          "Contributed 50K+ lines of code to an established codebase via Git",
          "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
          "Wrote an 8-page paper and gave multiple presentations on-campus",
          "Presented virtually to the World Conference on Computational Intelligence",
        ],
      },
    ],
    projects: [
      {
        title: "Gitlytics",
        details: [
          "Developed a full-stack web application using Flask serving a REST API with React as the frontend",
          "Implemented GitHub OAuth to get data from user's repositories",
          "Visualized GitHub data to show collaboration",
          "Used Celery and Redis for asynchronous tasks",
        ],
        technologies: ["mongdob", "node", "React Js"],
      },
      {
        title: "MyKanban",
        details: [
          "Developed a Kanban board application using React and Redux",
          "Implemented drag-and-drop functionality",
          "Used Firebase for backend services and authentication",
        ],
        technologies: ["mongdob", "node", "React Js"],
      },
    ],
    skills: {
      Languages: [
        "Java",
        "Python",
        "C/C++",
        "SQL (Postgres)",
        "JavaScript",
        "HTML/CSS",
        "R",
      ],
      Frameworks: [
        "React",
        "Node.js",
        "Flask",
        "JUnit",
        "WordPress",
        "Material-UI",
        "FastAPI",
      ],
      "Developer Tools": [
        "Git",
        "Docker",
        "TravisCI",
        "Google Cloud Platform",
        "VS Code",
        "TravisCI",
        "Visual Studio",
        "PyCharm",
        "IntelliJ",
        "Eclipse",
      ],
      Libraries: ["pandas", "NumPy", "Matplotlib"],
    },
  });
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full p-8">
        <ScrollArea className="h-full">
          <div className="flex h-auto w-full justify-between px-6">
            <h2 className="text-2xl font-bold">Your Resume</h2>
            <Button onClick={handleSaveResumeData}>Save</Button>
          </div>

          <div className="flex h-auto w-full flex-col md:flex-row">
            <div className="flex-1 p-6">
              <div className="py-2">
                <h2 className="mb-4 text-2xl font-bold">Basics</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={basicResumeData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={basicResumeData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={basicResumeData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={basicResumeData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={basicResumeData.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={basicResumeData.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Eudcation Section */}
          <EditEducation educationItems={educationItems} setEducationItems={setEducationItems}/>

          {/* Experiance */}
          <EditExperience />

          {/* Projects */}
          <EditProjects />

          {/* Skills */}
          <EditSkills />
        </ScrollArea>
      </div>
      <div className="w-1/2 h-full relative flex items-center justify-center bg-gray-400">
        {loading ? (
          <div className="absolute top-[50%] left-[50%]">
            <Spinner />
          </div>
        ) : null}
        <PDFViewer className="w-full h-full">
          <MyDocument data={resumeData} setLoading={setLoading} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default BuilderPage;
