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
import { ResumeData } from "@/types/Resume.type";

interface EditorProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

const Editor: FC<EditorProps> = ({ setLoading, setResumeData }) => {
  const [basicResumeData, setBasicResumeData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const [educationItems, setEducationItems] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [skills, setSkills] = useState({
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
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={basicResumeData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
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
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={basicResumeData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
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
      <EditEducation
        educationItems={educationItems}
        setEducationItems={setEducationItems}
      />

      {/* Experiance */}
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
