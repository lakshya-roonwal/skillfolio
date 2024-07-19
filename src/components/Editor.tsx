import React, { FC, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import EditEducation from "./Editer/EditEducation";
import EditExperience from "./Editer/EditExperience";
import EditProjects from "./Editer/EditProjects";
import EditSkills from "./Editer/EditSkills";
import { Basics, Education, Experience, Project, ResumeData, Skills } from "@/types/Resume.type";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import Spinner from "./Spinner";

interface EditorProps {
  resumeData: ResumeData;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

const Editor: FC<EditorProps> = ({ resumeData, setLoading, setResumeData }) => {
  const [basicResumeData, setBasicResumeData] = useState<Basics>({
    name: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const [educationItems, setEducationItems] = useState<Education[]>([]);
  const [experienceItems, setExperienceItems] = useState<Experience[]>([]);
  const [projectItems, setProjectItems] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skills>({
    Languages: [],
    Frameworks: [],
    "Developer Tools": [],
    Libraries: [],
  });

  const handleSaveResumeData = () => {
    setLoading(true);
    setResumeData((prevResumeData: ResumeData) => ({
      ...prevResumeData,
      skills: skills,
      projects: projectItems,
      experience: experienceItems,
      education: educationItems,
      basics: basicResumeData,
    }));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setBasicResumeData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <ScrollArea className="h-full p-6 bg-gray-50">
      <div className="flex h-auto w-full justify-between px-6 py-4 bg-white shadow-md rounded-md mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Resume</h2>
        <div className="flex gap-4">
          <PDFDownloadLink
            document={<MyDocument data={resumeData} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) => {
              if (loading) {
                setLoading(true);
                return (
                  <Button disabled className="flex items-center gap-2">
                    Download PDF <Spinner width={16} height={16} />
                  </Button>
                );
              }
              setLoading(false);
              return <Button>Download PDF</Button>;
            }}
          </PDFDownloadLink>
          <Button onClick={handleSaveResumeData}>Save</Button>
        </div>
      </div>

      <div className="flex h-auto w-full flex-col md:flex-row bg-white shadow-md rounded-md p-6">
        <div className="flex-1 p-4">
          <div className="py-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-700">Basics</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={basicResumeData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={basicResumeData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={basicResumeData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={basicResumeData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={basicResumeData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={basicResumeData.linkedin}
                  onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  className="border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <EditEducation
        educationaItems={educationItems}
        setEducationaItems={setEducationItems}
      />

      {/* Experience */}
      <EditExperience
        experienceItems={experienceItems}
        setExperienceItems={setExperienceItems}
      />

      {/* Projects */}
      <EditProjects
        projectItems={projectItems}
        setProjectItems={setProjectItems}
      />

      {/* Skills */}
      <EditSkills skills={skills} setSkills={setSkills} />
    </ScrollArea>
  );
};

export default Editor;
