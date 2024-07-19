"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Skills } from "@/types/Resume.type";

interface EditSkillsProps {
  skills: Skills;
  setSkills: Dispatch<SetStateAction<Skills>>;
}

const EditSkills: React.FC<EditSkillsProps> = ({ skills, setSkills }) => {
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState<boolean>(false);
  const [isDeleteSkillDialogOpen, setIsDeleteSkillDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newSkills, setNewSkills] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const handleAddSkill = (): void => {
    setIsAddSkillDialogOpen(true);
  };

  const handleDeleteSkill = (category: string, skill: string): void => {
    setSelectedCategory(category);
    setSelectedSkill(skill);
    setIsDeleteSkillDialogOpen(true);
  };

  const handleSaveSkills = (): void => {
    if (!newSkills.trim()) return;
    
    // Use the first category or "Other" if there is no selection
    const categoryToUse = selectedCategory || Object.keys(skills)[0] || "Other"; 
    
    const skillsToAdd: string[] = newSkills
      .split(",")
      .map(skill => skill.trim())
      .filter(skill => skill);
  
    setSkills(prevSkills => ({
      ...prevSkills,
      [categoryToUse]: Array.from(new Set([...prevSkills[categoryToUse] || [], ...skillsToAdd]))
    }));
  
    setNewSkills("");
    setSelectedCategory("");
    setIsAddSkillDialogOpen(false);
  };

  const handleDeleteConfirm = (): void => {
    if (!selectedCategory || !selectedSkill) return;

    setSkills(prevSkills => ({
      ...prevSkills,
      [selectedCategory]: prevSkills[selectedCategory].filter(skill => skill !== selectedSkill)
    }));

    setSelectedCategory("");
    setSelectedSkill("");
    setIsDeleteSkillDialogOpen(false);
  };

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
          {Object.keys(skills).map(category => (
            <div key={category}>
              <h3 className="text-lg font-bold">{category}</h3>
              <div className="flex gap-2 flex-wrap">
                {skills[category].map(skill => (
                  <Badge key={skill} className="flex gap-2">
                    {skill}
                    <X size="16px" onClick={() => handleDeleteSkill(category, skill)} />
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Skill Dialog */}
      <Dialog open={isAddSkillDialogOpen} onOpenChange={setIsAddSkillDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Skills</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                placeholder="Enter skills separated by commas"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
              defaultValue="Languages"
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
              <SelectTrigger>
                {selectedCategory || "Languages"}
              </SelectTrigger>
              <SelectContent>
                {Object.keys(skills).length > 0 ? (
                  Object.keys(skills).map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="default" disabled>No categories available</SelectItem>
               )}
              </SelectContent>
            </Select>
          </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddSkillDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveSkills}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Skill Dialog */}
      <Dialog open={isDeleteSkillDialogOpen} onOpenChange={setIsDeleteSkillDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-bold">{selectedSkill}</span> from{" "}
            <span className="font-bold">{selectedCategory}</span>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteSkillDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSkills;
