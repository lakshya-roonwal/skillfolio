"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"

const EditSkills = () => {
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
      "TravisCI",
      "Visual Studio",
      "PyCharm",
      "IntelliJ",
      "Eclipse",
    ],
    Libraries: ["pandas", "NumPy", "Matplotlib"],
  })

  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false)
  const [isDeleteSkillDialogOpen, setIsDeleteSkillDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")

  const handleAddSkill = () => {
    setIsAddSkillDialogOpen(true)
  }

  const handleDeleteSkill = (category, skill) => {
    setSelectedCategory(category)
    setSelectedSkill(skill)
    setIsDeleteSkillDialogOpen(true)
  }

  const handleSaveSkill = (newSkill, category) => {
    setSkills({
      ...skills,
      [category]: [...skills[category], newSkill],
    })
    setIsAddSkillDialogOpen(false)
  }

  const handleDeleteConfirm = () => {
    setSkills({
      ...skills,
      [selectedCategory]: skills[selectedCategory].filter((skill) => skill !== selectedSkill),
    })
    setIsDeleteSkillDialogOpen(false)
    setSelectedCategory("")
    setSelectedSkill("")
  }

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center py-2">
          <h2 className="mb-4 text-2xl font-bold">Skills</h2>
          <Button onClick={handleAddSkill} className="mb-4">
            Add Skill
          </Button>
        </div>
        <div className="space-y-4">
          {Object.keys(skills).map((category) => (
            <div key={category}>
              <h3 className="text-lg font-bold">{category}</h3>
              <div className="flex gap-2 flex-wrap">
                {skills[category].map((skill) => (
                    <Badge key={skill} className="flex gap-2">
                        {skill}
                        <X size={"16px"} onClick={() => handleDeleteSkill(category, skill)}/>
                    </Badge>
                //   <Card key={skill} className="flex items-center justify-between p-2">
                //     <p>{skill}</p>
                //     <Button variant="destructive" size="sm" >
                //       Delete
                //     </Button>
                //   </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isAddSkillDialogOpen} onOpenChange={setIsAddSkillDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="skill">Skill</Label>
              <Input id="skill" placeholder="Enter skill" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select id="category" onValueChange={setSelectedCategory}>
                <SelectTrigger>Choose a category</SelectTrigger>
                <SelectContent>
                  {Object.keys(skills).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSkillDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const newSkill = document.getElementById("skill").value
                handleSaveSkill(newSkill, selectedCategory)
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteSkillDialogOpen} onOpenChange={setIsDeleteSkillDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedSkill}</span> from{" "}
              <span className="font-bold">{selectedCategory}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteSkillDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditSkills
