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
  const [experienceItems, setExperienceItems] = useState([
    {
      id: 1,
      role: "Software Engineer",
      company: "Acme Inc",
      startDate: "2020-06-01",
      endDate: "2022-12-31",
      location: "San Francisco, CA",
      details: [
        "Worked on the development of new features for the company's main product.",
        "Collaborated with the design team to create user-friendly interfaces.",
      ],
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Globex Corporation",
      startDate: "2018-01-01",
      endDate: "2020-05-31",
      location: "New York, NY",
      details: [
        "Implemented responsive web designs for various client projects.",
        "Optimized web applications for maximum speed and scalability.",
      ],
    },
  ]);
  const [projectItems, setProjectItems] = useState([
    {
      id: 1,
      title: "Gitlytics",
      company: "Acme Inc",
      startDate: "July 2014",
      endDate: "June 2020",
      location: "Remote",
      details: [
        "Developed a full-stack web application using Flask serving a REST API with React as the frontend",
        "Implemented GitHub OAuth to get data from user's repositories",
        "Visualized GitHub data to show collaboration",
        "Used Celery and Redis for asynchronous tasks",
      ],
      technologies: ["mongodb", "node", "React Js"],
    },
    {
      id: 2,
      title: "MyKanban",
      company: "Globex Corporation",
      startDate: "July 2014",
      endDate: "June 2020",
      location: "New York, NY",
      details: [
        "Developed a Kanban board application using React and Redux",
        "Implemented drag-and-drop functionality",
        "Used Firebase for backend services and authentication",
      ],
      technologies: ["mongodb", "node", "React Js"],
    },
  ]);
  const [skills, setSkills] = useState({
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
      "Visual Studio",
      "PyCharm",
      "IntelliJ",
      "Eclipse",
    ],
    Libraries: ["pandas", "NumPy", "Matplotlib"],
  });

  const handleSaveResumeData = () => {
    setLoading(true);
    setResumeData((prevResumeData) => ({
      ...prevResumeData,
      skills:skills,
      projects:projectItems,
      experience:experienceItems,
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
    experience:experienceItems,
    projects:projectItems,
    skills:skills,
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
          <EditExperience experienceItems={experienceItems} setExperienceItems={setExperienceItems}/>

          {/* Projects */}
          <EditProjects projectItems={projectItems} setProjectItems={setProjectItems}/>

          {/* Skills */}
          <EditSkills skills={skills} setSkills={setSkills}/>
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
