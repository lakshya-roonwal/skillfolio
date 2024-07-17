"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/Resume.type";

interface EditProjectsProps {
  projectItems: Project[];
  setProjectItems: Dispatch<SetStateAction<Project[]>>;
}

const EditProjects: React.FC<EditProjectsProps> = ({ projectItems, setProjectItems }) => {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState<boolean>(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState<boolean>(false);
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] = useState<boolean>(false);
  const [selectedProjectItem, setSelectedProjectItem] = useState<Project | null>(null);
  const [formState, setFormState] = useState<{
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    details: string;
    technologies: string;
    link: string;
  }>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    details: "",
    technologies: "",
    link: "",
  });

  const handleAddProject = (): void => {
    setFormState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      details: "",
      technologies: "",
      link: "",
    });
    setIsAddProjectDialogOpen(true);
  };

  const handleEditProject = (item: Project): void => {
    setSelectedProjectItem(item);
    setFormState({
      title: item.title,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      details: item.details.join("\n") || "", // Convert array to string with new lines
      technologies: item.technologies.join(", ") || "", // Convert array to comma-separated string
      link: item.link || "",
    });
    setIsEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (item: Project): void => {
    setSelectedProjectItem(item);
    setIsDeleteProjectDialogOpen(true);
  };

  const handleSaveProject = (): void => {
    if (!formState.title || !formState.description || !formState.startDate || !formState.endDate) return;

    const newItem: Project = {
      id: selectedProjectItem ? selectedProjectItem.id : Date.now(),
      title: formState.title,
      description: formState.description,
      startDate: formState.startDate,
      endDate: formState.endDate,
      details: formState.details.split("\n").filter((detail) => detail.trim() !== ""), // Split by new lines and filter empty strings
      technologies: formState.technologies.split(",").map((tech) => tech.trim()).filter((tech) => tech), // Convert comma-separated string to array
      link: formState.link,
    };

    if (selectedProjectItem) {
      setProjectItems(
        projectItems.map((item) => (item.id === selectedProjectItem.id ? newItem : item))
      );
    } else {
      setProjectItems([...projectItems, newItem]);
    }

    setIsAddProjectDialogOpen(false);
    setIsEditProjectDialogOpen(false);
    setSelectedProjectItem(null);
  };

  const handleDeleteConfirm = (): void => {
    if (selectedProjectItem) {
      setProjectItems(
        projectItems.filter((item) => item.id !== selectedProjectItem.id)
      );
    }
    setIsDeleteProjectDialogOpen(false);
    setSelectedProjectItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-auto w-full flex-col md:flex-row">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center py-2">
          <h2 className="mb-4 text-2xl font-bold">Projects</h2>
          <Button onClick={handleAddProject} className="mb-4">
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {projectItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-2">
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProject(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(item)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Project Dialog */}
      <Dialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                placeholder="Enter project title"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formState.description}
                placeholder="Enter project description"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={formState.details}
                placeholder="Enter details separated by new lines"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formState.technologies}
                placeholder="Enter technologies separated by commas"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                value={formState.link}
                placeholder="Enter project link"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        open={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                placeholder="Enter project title"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formState.description}
                placeholder="Enter project description"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                value={formState.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                value={formState.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={formState.details}
                placeholder="Enter details separated by new lines"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input
                id="technologies"
                name="technologies"
                value={formState.technologies}
                placeholder="Enter technologies separated by commas"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                value={formState.link}
                placeholder="Enter project link"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Confirmation Dialog */}
      <Dialog
        open={isDeleteProjectDialogOpen}
        onOpenChange={setIsDeleteProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this project?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjects;

