"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import EditEducation from "./EditEducation";
import EditExperience from "./EditExperience";

const BuilderPage = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    role: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const handleInputChange = (field, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const data = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    education: [
      {
        institution: "Southwestern University",
        degree: "Bachelor of Arts in Computer Science, Minor in Business",
        location: "Georgetown, TX",
        startDate: "Aug. 2018",
        endDate: "May 2021",
      },
      {
        institution: "Blinn College",
        degree: "Associate's in Liberal Arts",
        location: "Bryan, TX",
        startDate: "Aug. 2014",
        endDate: "May 2018",
      },
    ],
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
         technologies:["mongdob","node","React Js"]
      },
      {
        title: "MyKanban",
        details: [
          "Developed a Kanban board application using React and Redux",
          "Implemented drag-and-drop functionality",
          "Used Firebase for backend services and authentication",
        ],
         technologies:["mongdob","node","React Js"]
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
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full bg-gray-200 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={resumeData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={resumeData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.location}
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
                  value={resumeData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={resumeData.github}
                onChange={(e) => handleInputChange("github", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Eudcation Section */}
        <EditEducation/>

        {/* Experiance */}
        <EditExperience/>
      </div>
      <div className="w-1/2 h-full bg-gray-400">
        <PDFViewer className="w-full h-full">
          <MyDocument data={data} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default BuilderPage;
